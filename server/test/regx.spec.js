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

var regFailAllContains = function(reg, arr){
	return arr.some(function(el){
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
			case 3:
				fn = regFailAllContains;
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

/**
 * Word boundry \b
 * Check if string contains word foo
 */
test('Contains word foo', function(t){
	var tReg = keepT(regx.word);
	t.true(tReg(['sp foo', 'foo sp', 'dsp foo sp'], 2));
	t.false(tReg(['sp dsp', 'foosp dsp', 'dspfoo sp'], 3));
	t.end();
});

/**
 * Lookahed operator ?=
 * Password having at least
 * one digit, one character, one symbol or underscore(\W_)
 * and minimum length 6
 */
test('Password validation', function(t){
	var tReg = keepT(regx.p_ahead);
	t.true(tReg(['sam1r#', '1asfg#', '1asdfsaf%', '1234asf_'], true))
	t.false(tReg(['samarp', '123456', '#$%^#@'], false));
	t.end();
});

/**
 * Negative lookahed ?!
 * Occurence of 'a' When it doesn't preceeds 'b'
 */
test('Negative lookahead', function(t){
	var tReg = keepT(regx.n_ahead);
	t.true(tReg(['ac', 'yasdf'], 2));
	t.false(tReg(['bab', 'abcd'], 3));
	t.end();
});


