var test = require('ava');
var p = require('path').resolve;
var l = console.log;

var cpath = 'server/src/ds/bst';

var Bst = require(p(cpath)).Bst;

var nums = new Bst();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);

test('Bst inOrder impl', function(t){
	t.same(nums.inOrder(nums.root), [ 3, 16, 22, 23, 37, 45, 99 ]);
	t.end();
});

test('Bst preOrder impl', function(t){
	t.same(nums.preOrder(nums.root), [ 23, 16, 3, 22, 45, 37, 99 ]);
	t.end();
});

test('Bst postOrder impl', function(t){
	t.same(nums.postOrder(nums.root), [ 3, 22, 16, 37, 99, 45, 23 ]);
	t.end();
});

test('Bst getMin', function(t){
	t.is(nums.getMin(), 3);
	t.end();
});

test('Bst getMax', function(t){
	t.is(nums.getMax(), 99);
	t.end();
});

test('Bst find Node', function(t){
	t.is(nums.find(22).data, 22);
	t.end();
});

test('Bst remove node', function(t){
	var nums = new Bst();
	nums.insert(23);
	nums.insert(45);
	nums.insert(16);
	nums.insert(37);
	nums.insert(3);
	nums.insert(99);
	nums.insert(22);
	nums.remove(16);

	t.same(nums.inOrder(nums.root), [ 3, 22, 23, 37, 45, 99 ]);
	t.end();
});