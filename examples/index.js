'use strict';

var minkowski = require( './../lib' );

var x = [
	[1,2],
	[2,4],
	[3,5],
	[4,3],
	[5,8],
	[6,2]
],
y = [
	[1,3],
	[2,1],
	[3,5],
	[4,3],
	[5,7],
	[6,2]
];

function getValue( d ) {
	return d[ 1 ];
}

var dist = minkowski( x, y, 1, getValue );
// returns 5

console.log( dist );
