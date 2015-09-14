var test = require('ava');
var p = require('path').resolve;
var util = require(p('server/src/util'));

test('Test sum2', function(t){
	t.ok(util.sum2(1,2), 3);
	t.end();
});

test('Test substract2', function(t){
	t.ok(util.substract2(2,1), 1);
	t.end();
});