var test = require('ava');
var p = require('path').resolve;
var l = console.log;

var Stack = require(p('server/src/ds/stack')).Stack;

test('Stack Implementation', function(t){
	'use strict';
	let stack = new Stack();
	stack.push('Me');
	t.is(stack.get(), 'Me');
	t.end();
});

test('Stack length', function(t){
	'use strict';
	let stack = new Stack();
	stack.bulkPush('Hello', 'Me', 'Are');
	t.is(stack.length(), 3);
	t.end();
})

