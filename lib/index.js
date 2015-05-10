'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isFunction = require( 'validate.io-function' ),
	isNumber = require( 'validate.io-number' );


// FUNCTIONS //

/**
* FUNCTION: minkowski( x, y, p[, accessor] )
* 		calculates the Minkowski distance between two n-dimensional vectors
*
* @param {Array} x - array
* @param {Array} y - array
* @param {Number} p - order of the norm
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number} Minkowski distance
*/
function minkowski( x, y, p, clbk ) {

	var dist, i;

	if ( !isArray(x) ) {
		throw new TypeError( 'minkowski()::invalid input argument. x argument must be a number array. Value: `' + x + '`.' );
	}

	if ( !isArray(y) ) {
		throw new TypeError( 'minkowski()::invalid input argument. y argument must be a number array. Value: `' + y + '`.' );
	}

	if ( x.length !== y.length ) {
		throw new TypeError( 'minkowski()::invalid input arguments. x and y must have the same length' );
	}

	// in case of empty arrays, return null
	if ( x.length === 0 ) {
		return null;
	}

	if ( !isNumber(p) ) {
		throw new TypeError( 'minkowski()::invalid input argument. p must be a number Value: `' + p + '`.' );
	}

	if ( arguments.length > 3 ) {
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'minkowski()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
		}
	}

	dist = 0;
	if ( clbk ) {
		for ( i = 0; i < x.length; i++ ) {
			dist += Math.pow( Math.abs( clbk( x[i] ) -  clbk( y[i] ) ), p );
		}
	} else {
		for ( i = 0; i < x.length; i++ ) {
			dist += Math.pow( Math.abs(  x[i] -  y[i] ), p );
		}
	}

	return Math.pow( dist, 1/p );

} // end FUNCTION minkowski()


// EXPORTS //

module.exports = minkowski;
