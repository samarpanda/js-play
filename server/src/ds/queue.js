var l = console.log;
var p = require('path').resolve;

var Queue = function(){
	this.datastore = [];
};

Queue.prototype.enqueue = function(item){
	this.datastore.push(item);
};
Queue.prototype.dequeue = function(){
	return this.datastore.shift();
};
Queue.prototype.front = function(){
	return this.datastore[0];
};
Queue.prototype.back = function(){
	return this.datastore[this.datastore.length - 1];
};
Queue.prototype.isEmpty = function(){
	return this.datastore.length === 0;
};
Queue.prototype.length = function(){
	return this.datastore.length;
};

Queue.prototype.bulkPush = function(){
	var args = Array.prototype.slice.apply(arguments);
	args.map((el) => {
		this.enqueue(el);
	});
}

exports.Queue = Queue;