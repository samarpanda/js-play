var test = require('ava');
var p = require('path').resolve;
var l = console.log;

var cpath = 'server/src/ds/set';

var Set = require(p(cpath)).Set;

test('Set implementation', (t) => {
	var set = new Set();
	set.add('How');
	set.add('Are');
	set.add('You');

	t.same(set.get(), ['How', 'Are', 'You']);
	t.end();
});

test('Set union', (t) => {
	var set = new Set();
	set.add('How');

	var set2 = new Set();
	set2.add('Are');
	set2.add('You');

	t.same(set2.union(set).datastore, ['How', 'Are', 'You']);
	t.end();
});

test('Set intersection', (t) => {
	var set1 = new Set();
	set1.add('How');

	var set2 = new Set();
	set2.add('How');
	set2.add('Are');

	t.same(set1.intersection(set2).datastore, set1.datastore);
	t.end();
})

test('Set difference', (t) => {
	var set1 = new Set();
	set1.add('How');

	var set2 = new Set();
	set2.add('How');
	set2.add('Are');

	t.same(set2.difference(set1).datastore, ['Are']);
	t.end();
})