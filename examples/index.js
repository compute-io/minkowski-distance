'use strict';

var minkowski = require( './../lib' );

var x = new Array( 100 ),
	y = new Array( 100 );

for ( var i = 0; i < x.length; i++ ) {
	x[ i ] = Math.round( Math.random()*100 );
	y[ i ] = Math.round( Math.random()*100 );
}

// Euclidean distance (default):
console.log( minkowski( x, y ) );

// Manhattan (city block) distance:
console.log( minkowski( x, y, {
	'p': 1
}));

// Chebyshev distance:
console.log( minkowski( x, y, {
	'p': Number.POSITIVE_INFINITY
}));

// Some other distance:
console.log( minkowski( x, y, {
	'p': 3
}));
