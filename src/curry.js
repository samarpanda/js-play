/**
 * Auto curry
 */
var type0 = function(fn){

};

/**
 * Curry for two arguments function passed one at a time.
 */
var type1 = function(fn){
	return function(){
		if(fn.length > arguments.length){
			var slice = Array.prototype.slice;
			var args = slice.apply(arguments);
			return function(){
				return fn.apply(null, args.concat(Array.prototype.slice.apply(arguments)));
			};
		}else{
			return fn.apply(null, arguments);
		}
	};
};

var type2 = function(fn, args, context){
	
	function f(){
		// return 5;
	}

	return f;
}

exports.type0 = type0;
exports.type1 = type1;
exports.type2 = type2;