var l = console.log;

var isEqual = function(x, y){
	if(x === y){
		return true;
	}

	if(!(x instanceof Object) || !(y instanceof Object)){
		return false;
	}

	if(x.constructor !== y.constructor){
		return false;
	}

	for(p in x){
		if( !x.hasOwnProperty(p) ) continue;
		if( !y.hasOwnProperty(p) ) return false;
		if( x[p] === y[p] ) continue;

		//Strings, Numbers, Functions, Booleans
		if( typeof x[p] !== 'object') return false;

		if( !Object.equals(x[p], y[p])) return false;
	}

	for(p in y){
		if(y.hasOwnProperty(p) && !x.hasOwnProperty(p))
			return false;
	}
	return true;
};

exports.isEqual = isEqual;