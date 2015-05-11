'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' ),
	isNumber = require( 'validate.io-number-primitive' );


// MINKOWSKI DISTANCE //

/**
* FUNCTION: minkowski( x, y[, options] )
*	Computes the Minkowski distance between two arrays.
*
* @param {Array} x - input array
* @param {Array} y - input array
* @param {Object} [options] - function options
* @param {Number} [options.p=2] - norm order
* @param {Function} [options.accessor] - accessor function for accessing array values
* @returns {Number|Null} Minkowski distance or null
*/
function minkowski( x, y, opts ) {
	var p = 2,
		clbk,
		len,
		d, v,
		i;

	if ( !isArray( x ) ) {
		throw new TypeError( 'minkowski()::invalid input argument. First argument must be a number array. Value: `' + x + '`.' );
	}
	if ( !isArray( y ) ) {
		throw new TypeError( 'minkowski()::invalid input argument. Second argument must be a number array. Value: `' + y + '`.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'minkowski()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'p' ) ) {
			p = opts.p;
			if ( !isNumber( p ) || p <= 0 ) {
				throw new TypeError( 'minkowski()::invalid option. `p` option must be a positive number primitive. Option: `' + p + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'minkowski()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
		}
	}
	len = x.length;
	if ( len !== y.length ) {
		throw new TypeError( 'minkowski()::invalid input arguments. Input arrays must have the same length.' );
	}
	if ( !len ) {
		return null;
	}
	d = 0;
	if ( clbk ) {
		if ( p === Number.POSITIVE_INFINITY ) {
			v = clbk( x[0], 0, 0 ) - clbk( y[0], 0, 1 );
			d = ( v < 0 ) ? -v : v;
			for ( i = 1; i < len; i++ ) {
				v = clbk( x[i], i, 0 ) - clbk( y[i], i, 1 );
				if ( v < 0 ) {
					v = -v;
				}
				if ( v > d ) {
					d = v;
				}
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				v = clbk( x[i], i, 0 ) - clbk( y[i], i, 1 );
				if ( v < 0 ) {
					v = -v;
				}
				d += Math.pow( v, p );
			}
		}
	} else {
		if ( p === Number.POSITIVE_INFINITY ) {
			v = x[ 0 ] - y[ 0 ];
			d = ( v < 0 ) ? -v : v;
			for ( i = 1; i < len; i++ ) {
				v = x[ i ] - y[ i ];
				if ( v < 0 ) {
					v = -v;
				}
				if ( v > d ) {
					d = v;
				}
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				v = x[ i ] - y[ i ];
				if ( v < 0 ) {
					v = -v;
				}
				d += Math.pow( v, p );
			}
		}
	}
	return Math.pow( d, 1/p );
} // end FUNCTION minkowski()


// EXPORTS //

module.exports = minkowski;
