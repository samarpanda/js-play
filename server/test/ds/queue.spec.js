var test = require('ava');
var p = require('path').resolve;
var l = console.log;

var Queue = require(p('server/src/ds/queue')).Queue;

test('Queue Implementation', function(t){
	'use strict';
	let queue = new Queue();
	queue.enqueue('Me');
	t.is(queue.front(), 'Me');
	t.end();
});

test('Queue isEmpty', function(t){
	'use strict';
	let queue = new Queue();
	t.is(queue.isEmpty(), true);
	t.end();
});

test('Queue bulkPush and length', function(t){
	'use strict';
	let queue = new Queue();
	queue.bulkPush('Me', 'Hello');
	t.is(queue.length(), 2);
	t.is(queue.front(), 'Me');
	t.is(queue.back(), 'Hello');
	t.end();
});

test('Queue get front and back', function(t){
	'use strict';
	let queue = new Queue();
	queue.bulkPush('Me', 'Yo', 'Hello');
	t.is(queue.front(), 'Me');
	t.is(queue.back(), 'Hello');
	t.end();
});