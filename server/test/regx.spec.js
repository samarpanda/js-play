var test = require('ava');
var p = require('path').resolve;
var reg = require(p('server/src/regx'));
var l = console.log;

var regx = reg.regx;
var ureg = reg.uregx;

var regPassAllContains = function(reg, arr){
	return arr.every(function(el){
		// l(el.search(reg), el);
		return el.search(reg) > -1;
	});
};

var regPassAll = function(reg, arr){
	return arr.every(function(el){
		// l(el.search(reg), el);
		return el.search(reg) === 0;
	});
};

var regFailAll = function(reg, arr){
	return arr.some(function(el){
		// l(el.search(reg), el);
		return el.search(reg) === 0;
	});
};

/**
 * Simple curry
 */
var keepT = function(regx){
	return function(arr, val){
		var fn;
		switch(val){
			case true:
				fn = regPassAll;
			break;
			case false:
				fn = regFailAll;
			break;
			case 2://Contains
				fn = regPassAllContains;
			break;
			default:
				fn = regPassAll;
			break;
		}
		return fn(regx, arr);
	};
};

test('Is date', function(t){
	var tReg = keepT(regx.rdate);
	t.true(tReg(['2015-12-23'], true));
	t.false(tReg(['2015-13-20', '2015-12-33'], false));
	t.end();
});

test('Is hexadecimal', function(t){
	var tReg = keepT(regx.hdec);
	t.true(tReg(['#fab', '#ccc', '#123', '#123abc'], true));
	t.false(tReg(['#fab1', '#ccc2', '#1233', '#ab'], false));
	t.end();
});

test('Is Integer', function(t){
	var tReg = keepT(regx.num);
	t.true(tReg(['.5', '+1.5', '-1.', '25', '0.25'], true));
	t.false(tReg(['--5.0', '++2.-', '+-0.2'], false));

	//To fix this False positive
	t.true(tReg(['5..0'], true));
	t.end();
});

test('Contains word', function(t){
	var tReg = keepT(regx.word);
	t.true(tReg(['sp foo', 'foo sp', 'dsp foo sp'], 2));
	t.end();
});