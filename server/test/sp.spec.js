var test = require('ava');
var p = require('path').resolve;
var sp = require(p('server/src/sp'));

test('x & y are null', function(t){
	t.true(sp.isEqual(null, null));
	t.end();
});

test('x & y are undefined', function(t){
	t.true(sp.isEqual(undefined, undefined));
	t.end();
});

test('null & undefined', function(t){
	t.false(sp.isEqual(undefined, null));
	t.end();
});

test('Two new Object()', function(t){
	t.is(sp.isEqual(new Object(), new Object()), true);
	t.end();
});

test('New object of a function', function(t){
	var me = function(id){
		this.id = id;
	};

	t.is(sp.isEqual(new me(1), new me(2)), false);
	t.end();
});