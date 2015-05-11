/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	minkowski = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-minkowski-distance', function tests() {

	it( 'should export a function', function test() {
		expect( minkowski ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array as the first input argument', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				minkowski( value, [1,2,3] );
			};
		}
	});

	it( 'should throw an error if not provided an array as the second input argument', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				minkowski( [2,3,4], value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				minkowski( [2,3,4], [3,4,5], value );
			};
		}
	});

	it( 'should throw an error if provided a `p` option which is not a positive number primitive', function test() {
		var values = [
			'5',
			-5,
			0,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				minkowski( [2,3,4], [3,4,5], {
					'p': value
				});
			};
		}
	});

	it( 'should throw an error if provided an accessor option which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			{},
			[]
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				minkowski( [2,3,4], [3,4,5], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if the input arrays are not the same length', function test() {
		expect( badValue( [ 1, 2, 3 ], [ 1, 2, 3, 4 ] ) ).to.throw( Error );
		function badValue( val1, val2 ) {
			return function() {
				minkowski( val1, val2 );
			};
		}
	});

	it( 'should return null if provided empty arrays', function test() {
		assert.isNull( minkowski( [], [] ) );
	});

	it( 'should compute the Minkowski distance', function test() {
		var dat1, dat2, expected, actual;

		// Norm: 1
		dat1 = [ 2, 4, 5, 3, 8, 2 ];
		dat2 = [ 3, 1, 5, 3, 7, 2 ];

		actual = minkowski( dat1, dat2, {
			'p': 1
		});
		expected = 5;

		assert.strictEqual( actual, expected, 'norm: 1' );

		// Norm: 2
		dat1 = [ 2, 4, 5, 3, 8, 2 ];
		dat2 = [ 3, 1, 5, -3, 7, 2 ];

		actual = minkowski( dat1, dat2, {
			'p': 2
		});
		expected = 6.855655;

		assert.closeTo( actual, expected, 1e-6, 'norm: 2' );

		// Norm: 3
		dat1 = [ 2, 4, 5, 3, 8, 2 ];
		dat2 = [ 3, 1, 5, -3, 0, 2 ];

		actual = minkowski( dat1, dat2, {
			'p': 3
		});
		expected = 9.109767;

		assert.closeTo( actual, expected, 1e-6, 'norm: 3' ) ;
	});

	it( 'should compute the Minkowski distance using an accessor function', function test() {
		var dat1, dat2, expected, actual;

		dat1 = [
			[1,2],
			[2,4],
			[3,5],
			[4,3],
			[5,8],
			[6,2]
		];
		dat2 = [
			[1,3],
			[2,1],
			[3,5],
			[4,3],
			[5,7],
			[6,2]
		];

		actual = minkowski( dat1, dat2, {
			'p': 1,
			'accessor': getValue
		});
		expected = 5;

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should compute the Euclidean distance by default', function test() {
		var dat1, dat2, expected, actual;

		dat1 = [ 2, 4, 5, 3, 8, 2 ];
		dat2 = [ 3, 1, 5, -3, 7, 2 ];

		actual = minkowski( dat1, dat2, {
			'p': 2
		});
		expected = minkowski( dat1, dat2 );

		assert.strictEqual( actual, expected );
	});

});
