var test = require('ava');
var p = require('path').resolve;
var reg = require(p('server/src/regx'));
var l = console.log;

var regx = reg.regx;
var ureg = reg.uregx;

var regTest = function(reg, arr){
	return arr.every(function(el){
		return el.match(reg);
	});
};

var keepT = function(regx){
	return function(arr){
		return regTest(regx, arr);
	};
};

test('Is date', function(t){
	var tReg = keepT(regx.rdate);
	//Valid date
	t.is(tReg(['2015-12-23']), true);
	//Invalid date
	t.is(tReg(['2015-13-20', '2015-12-33']), false);
	t.end();
});

test('Is hexadecimal', function(t){
	var tReg = keepT(regx.hdec);
	//Valid hexadecimal
	t.is(tReg(['#fab', '#ccc', '#123', '#123abc']), true);
	//Invalid hexadecimal
	t.is(tReg(['#fab1', '#ccc2', '#12323', '#ab']), false);
	t.end();
});