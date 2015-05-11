Minkowski Distance
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [Minkowski distance](http://en.wikipedia.org/wiki/Minkowski_distance) between two arrays.

The [Minkowski distance](http://en.wikipedia.org/wiki/Minkowski_distance) defines a distance between two points in a normed vector space.

<div align="center">
	<img src="https://github.com/compute-io/minkowski-distance/blob/master/docs/img/eqn.png" alt="Minkowski distance formula" height="64px">
	<br>
</div>


## Installation

``` bash
$ npm install compute-minkowski-distance
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var minkowski = require( 'compute-minkowski-distance' );
```

#### minkowski( x, y, [opts] )

Computes the [Minkowski distance](http://en.wikipedia.org/wiki/Minkowski_distance) between two `arrays`.

``` javascript 
var x = [ 2, 4, 5, 3, 8, 2 ],
	y = [ 3, 1, 5, -3, 7, 2 ];

var d = minkowski( x, y );
// returns ~6.86
```

The function accepts the following `options`:

*	__p__: norm order (*p*>0). Special cases:
	-	`p=1`: [Manhattan distance](http://en.wikipedia.org/wiki/Taxicab_geometry)
	-	`p=2`: [Euclidean distance](http://en.wikipedia.org/wiki/Euclidean_distance)
	-	`p=+infinity`: [Chebyshev distance](http://en.wikipedia.org/wiki/Chebyshev_distance) 
*	__accessor__: accessor function for accessing `array` values.

By default, the norm order is `2` ([Euclidean distance](http://en.wikipedia.org/wiki/Euclidean_distance)). To specify a different order, set the `p` option.

``` javascript
var x = [ 2, 4, 5, 3, 8, 2 ],
	y = [ 3, 1, 5, 3, 7, 2 ];

var d = minkowski( x, y, {
	'p': 1
});
// returns 5
```

For object `arrays`, provide an accessor `function` for accessing `numeric` values.

``` javascript
var x = [
	{'x':2},
	{'x':4},
	{'x':5}
];

var y = [
	[1,1],
	[2,2],
	[3,7]
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d.x;
	}
	return d[ 1 ];
}

var dist = minkowski( x, y, {
	'accessor': getValue
});
// returns 3
```

The accessor `function` is provided three arguments:

-	__d__: current datum.
-	__i__: current datum index.
-	__j__: array index; e.g., array `x` has index `0`, and array `y` has index `1`.

If provided empty `arrays`, the function returns `null`.



## Examples

``` javascript
var minkowski = require( 'compute-minkowski-distance' );

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

function getValue( d, i, j ) {
	return d[ 1 ];
}

var d = minkowski( x, y, {
	'p': 1,
	'accessor': getValue
});
// returns 5
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Philipp Burckhardt.


[npm-image]: http://img.shields.io/npm/v/compute-minkowski-distance.svg
[npm-url]: https://npmjs.org/package/compute-minkowski-distance

[travis-image]: http://img.shields.io/travis/compute-io/minkowski-distance/master.svg
[travis-url]: https://travis-ci.org/compute-io/minkowski-distance

[coveralls-image]: https://img.shields.io/coveralls/compute-io/minkowski-distance/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/minkowski-distance?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/minkowski-distance.svg
[dependencies-url]: https://david-dm.org/compute-io/minkowski-distance

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/minkowski-distance.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/minkowski-distance

[github-issues-image]: http://img.shields.io/github/issues/compute-io/minkowski-distance.svg
[github-issues-url]: https://github.com/compute-io/minkowski-distance/issues
