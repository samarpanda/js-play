var l = console.log;

var regx = function(){

	return {
		'rdate': /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[0-1])$/,
		'hdec': /^#([a-f\d]{3}){1,2}$/
	};
}();

var uregx = function(){

}();

exports.regx = regx;
exports.uregx = uregx;