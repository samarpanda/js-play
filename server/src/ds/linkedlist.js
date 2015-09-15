var l = console.log;

var Node = function(data){
	this.data = data;
	this.next = null;
}
var LList = function(){
	this.head = new Node('head');
};

LList.prototype.find = function(data){
	var currNode = this.head;
	while(currNode.data !== data){
		currNode = currNode.next;
	}
	return currNode;
};
LList.prototype.findPrevious = function(data){
	var currNode = this.head;
	while(
		(currNode.next !== null)
		&& (currNode.next.data !== data)
	){
		currNode = currNode.next;
	}
	return currNode;
};
LList.prototype.insert = function(newData, data){
	var newNode = new Node(newData);
	var current = this.find(data);
	newNode.next = current.next;
	current.next = newNode;
};
LList.prototype.remove = function(data){
	var prevNode = this.findPrevious(data);
	if(!(prevNode.next == null)){
		prevNode.next = prevNode.next.next;
	}
};
LList.prototype.display = function(){
	var currNode = this.head;
	while(!(currNode.next === null)){
		l(currNode.next.data);
		currNode = currNode.next;
	}
};

exports.LinkedList = LList;