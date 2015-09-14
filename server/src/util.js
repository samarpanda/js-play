
var l = console.log;

var sum2 = function(a,b){
	return a + b;
}

function sum3(a, b, c){
	return a + b + c;
};

var substract2 = function(a, b){
	return a-b;
}

exports.sum2 = sum2;
exports.sum3 = sum3;
exports.substract2 = substract2;