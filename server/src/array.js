var l = console.log;

var myMap = function(func){
	var result = [];
	this.forEach(function(el){
		result.push(func(el));
	});
	return result;
};

var myFilter = function(func){
	var result = [];
	this.forEach(function(el){
		if(func(el)){
			result.push(el);
		}
	});
	return result;
};

var concatAll = function(){
	var result = [];
	// el needs to be a sub-array.
	// so the input looks like [[1,2], [8, 9]]
	this.forEach(function(el){
		result.push.apply(result, el);
	});
	return result;
}

var concatMap = function(fnReturnsArr){
	return this.map(function(item){
		return fnReturnsArr(item);
	}).concatAll();
}

var myReduce = function(combiner, initValue){
	var accumulatedValue,
		counter;

	if(this.length === 0){
		return this;
	}else{
		if(arguments.length === 1){
			counter = 1;
			accumulatedValue = this[0];
		}else if(arguments.length >= 2){
			counter = 0;
			accumulatedValue = initValue;
		}else{
			throw 'invalid arguments';
		}
	}
	while(counter < this.length){
		accumulatedValue = combiner(accumulatedValue, this[counter]);
		counter++;
	};
	return accumulatedValue;
};

var zip = function(left, right, combine){
	var counter,
	results = [];

	for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
		results.push(combine(left[counter],right[counter]));
	}

	return results;
};

var cloneArray = function(){

};
var uEvery = function(){};
var uSome = function(){};

exports.cloneArray = cloneArray;
exports.myMap = myMap;
exports.myFilter = myFilter;
exports.concatAll = concatAll;
exports.concatMap = concatMap;
exports.myReduce = myReduce;
exports.zip = zip;