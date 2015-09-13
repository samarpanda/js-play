var test = require('ava');
var p = require('path').resolve;
var l = console.log;

var curry = require(p('src/curry'));

var util = require(p('src/util'));
var sum2 = util.sum2;

test('Test curry type1', function(t){
	"use strict";
	let s = curry.type1(sum2),
		s1 = s(2);
	t.is(s1(3), 5);
	t.end();
});

test('Curry type2 with no argument', function(t){
	"use strict";
	let s = curry.type2(sum2),
		s1 = s(2);
	t.is(s1(3), 5);
	t.end();
});

test('Curry type2 with one argument', function(t){
	"use strict";
	let s = curry.type2(sum2(2));
	t.is(s(3), 5);
	t.end();
});

test('Curry type2 with all arguments', function(t){
	"use strict";;
	t.is(curry.type2(sum2(2, 3)), 5);
	t.end();
});
