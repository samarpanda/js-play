var l = console.log;

var Node = function(data, left, right){
	this.data = data;
	this.left = left;
	this.right = right;
};
Node.prototype.show = function(){
	return this.data;
};

var Bst = function(){
	this.root = null;
};

Bst.prototype.insert = function(data){
	var n = new Node(data, null, null);
	if(this.root === null){
		this.root = n;
	}else{
		var current = this.root;
		var parent;
		while(true){
			parent = current;
			if(data < current.data){
				current = current.left;
				if(current === null){
					parent.left = n;
					break;
				}
			}else{
				current = current.right;
				if(current === null){
					parent.right = n;
					break;
				}
			}
		}
	}
};

Bst.prototype.inOrder = function(node){
	var result = arguments[1] || [];
	if(node !== null){
		this.inOrder(node.left, result);
		if(node.data !== undefined)
			result.push(node.data);
		this.inOrder(node.right, result);
	}
	return result;
};

Bst.prototype.preOrder = function(node){
	var result = arguments[1] || [];
	if(node !== null){
		if(node.data !== undefined)
			result.push(node.data);
		this.preOrder(node.left, result);
		this.preOrder(node.right, result);
	}
	return result;
};

Bst.prototype.postOrder = function(node){
	var result = arguments[1] || [];
	if(node !== null){
		this.postOrder(node.left, result);
		this.postOrder(node.right, result);
		if(node.data !== undefined)
			result.push(node.data);
	}
	return result;
}

Bst.prototype.getMin = function(){
	var current = this.root;
	while(current.left !== null){
		current = current.left;
	}
	return current.data;
};

Bst.prototype.getMax = function(){
	var current = this.root;
	while(current.right !== null){
		current = current.right;
	}
	return current.data;
};

Bst.prototype.find = function(data){
	var current = this.root;
	while(current.data !== data){
		if(data < current.data){
			current = current.left;
		}else{
			current = current.right;
		}
		if(current === null){
			return null;
		}
	}
	return current;
};

Bst.prototype.remove = function(data){
	this.root = this.removeNode(this.root, data)
};
Bst.prototype.removeNode = function(node, data){
	if(node === null){
		return null;
	}
	// Go the current node
	if(data === node.data){
		if(node.left === null && node.right === null)
			return null;
		if(node.left === null){
			return node.right;
		}
		if(node.right === null){
			return node.left;
		}
		var tempNode = this.getMin(node.right);
		node.data = tempNode.data;
		node.right = this.removeNode(node.right, tempNode.data);
		return node;
	}else if(data < node.data){
		node.left = this.removeNode(node.left, data);
		return node;
	}else{
		node.right = this.removeNode(node.right, data);
		return node;
	}
};

exports.Bst = Bst;