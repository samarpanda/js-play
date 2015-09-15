var test = require('ava');
var p = require('path').resolve;
var l = console.log;

var cpath = 'server/src/ds/linkedlist';

var LList = require(p(cpath)).LinkedList;

test('LinkedList Implementation', (t)=>{
	'use strict';
	let list = new LList();
	list.insert('Samar', 'head');
	list.insert('Hello', 'Samar');
	t.is(list.find('Hello').data, 'Hello');
	t.is(list.find('Samar').data, 'Samar');
	t.end();
});


test('LinkedList Remove', (t)=>{
	'use strict';
	let list = new LList();
	list.insert('Samar', 'head');
	list.insert('Hello', 'Samar');
	list.insert('Hi', 'Hello');
	list.remove('Samar');
	t.is(list.head.next.data, 'Hello');
	t.end();
});