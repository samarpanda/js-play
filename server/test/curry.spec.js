var test = require('ava');
var p = require('path').resolve;
var l = console.log;

var curry = require(p('src/curry'));

var util = require(p('src/util'));
var sum2 = util.sum2;
var sum3 = util.sum3;

test('Test curry type1', function(t){
	"use strict";
	let s = curry.type1(sum2),
		s1 = s(2);
	t.is(s1(3), 5);
	t.end();
});

/**
 * Sub curry
 */
test('Subcurry passing function only', function(t){
	'use strict';
	var s = curry.type0(sum2);
	t.is(s(1, 2), 3);
	t.end();
});

test('Subcurry passing function & argument', function(t){
	'use strict';
	var s = curry.type0(sum2, 1);
	t.is(s(2), 3);
	t.end();
});

/**
 * Auto curry
 */
test('Auto curry with no argument', function(t){
	"use strict";
	let s = curry.type2(sum2),
		s1 = s(2);
	t.is(s1(3), 5);
	t.end();
});

test('Auto curry with all arguments', function(t){
	"use strict";
	let s = curry.type2(sum2);
	t.is(s(2,3), 5);
	t.end();
});