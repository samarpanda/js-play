var l = console.log;

var Stack = function(){
	this.datastore = [];
	this.top = 0;
};

Stack.prototype.bulkPush = function(){
	var args = Array.prototype.slice.apply(arguments);
	var self = this;
	args.map(function(el){
		self.push(el);
	});
};

Stack.prototype.push = function(item){
	this.datastore[this.top++] = item;
}

Stack.prototype.pop = function(){
	return this.datastore[--this.top];
};

Stack.prototype.get = function(){
	return this.datastore[this.top - 1];
}

Stack.prototype.clear = function(){
	this.datastore = [];
	this.top = 0;
};

Stack.prototype.length = function(){
	return this.top;
};

exports.Stack = Stack;