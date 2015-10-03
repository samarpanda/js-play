var l = console.log;

var toArray = function(args){
	return [].slice.call(args);
}

/**
 * Sub curry
 */
var type0 = function(fn){
	var args = Array.prototype.slice.call(arguments, 1);
	return function(){
		return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)))
	}
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

/**
 * Auto Curry
 */
var type2 = function(fn, numArgs){
	var numArgs = numArgs || fn.length;
	function f(){
		if(arguments.length < numArgs){
			return numArgs - arguments.length > 0 ?
				type2(type0.apply(this, [fn].concat(toArray(arguments))), numArgs - arguments.length) :
				type0.apply(this, [fn].concat(Array.prototype.slice.apply(arguments)));
		}else{
			return fn.apply(this, arguments);
		}
	}
	f.toString = function(){};
	f.curried = true;
	return f;
};

/**
 * Proxy curry
 */
var type3 = function(fn){
	return new Proxy(fn, _curryHandler([]));
};
var _curryHandler = function(){
	return {
		apply: function(target, thisArg, argList){
			var totalArgs = boundArgs.concat(argList);
			return totalArgs.length >= target.length ? target.apply(thisArg, totalArgs) : new Proxy(target, _curryHandler(totalArgs));
		},
		get: function(target, prop, recv){
			switch(prop){
				case: 'length':
					return target.length - boundArgs.length;
				case: 'name':
					return target.name;
				default:
					return target[prop];
			}
		}
	};
};

exports.type0 = type0;
exports.type1 = type1;
exports.type2 = type2;
exports.type3 = type3;