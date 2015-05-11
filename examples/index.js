'use strict';

var minkowski = require( './../lib' );

var x, y, d;

x = [
	[1,2],
	[2,4],
	[3,5],
	[4,3],
	[5,8],
	[6,2]
];
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

d = minkowski( x, y, {
	'p': 1,
	'accessor': getValue
});

console.log( d );
// returns 5
