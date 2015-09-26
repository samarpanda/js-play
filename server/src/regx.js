var l = console.log;

var regx = function(){

	return {
		// 2015-12-23
		'rdate': /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[0-1])$/,
		// #123abc, #fab
		'hdec': /^#(?:[a-f\d]{3}){1,2}$/,
		// .5, +1.5, -1., 25
		'num': /^[+-]?(?:\d*\.?\d+|\d+\.)/g,
		// sp foo dsp
		'word': /\bfoo\b/
	};
}();

var uregx = function(){

}();

exports.regx = regx;
exports.uregx = uregx;