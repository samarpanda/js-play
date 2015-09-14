var test = require('ava');
var p = require('path').resolve;
var l = console.log;

var lib = require(p('server/src/rs-in-words'));

test('inWords 50', function(t){
	t.is(lib.inWords(50), 'fifty only ');
	t.end();
});

test('inWords 100', function(t){
	t.is(lib.inWords(100), 'one hundred only ');
	t.end();
});

test('inWords 1000', function(t){
	t.is(lib.inWords(1000), 'one thousand only ');
	t.end();
});

test('inWords 100000', function(t){
	t.is(lib.inWords(100000), 'one lakh only ');
	t.end();
});