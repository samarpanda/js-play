var l = console.log;

var Set = function(){
	this.datastore = [];
};

Set.prototype.add = function(data){
	if(this.datastore.indexOf(data) < 0){
		this.datastore.push(data);
	}else
		return false;
};
Set.prototype.get = function(){
	return this.datastore;
};
Set.prototype.remove = function(item){
	var pos = this.datastore.indexOf(item);
	if(pos > -1){
		this.datastore.splice(pos, 1);
		return true;
	}else
		return false;
};
Set.prototype.contains = function(item){
	if(this.datastore.indexOf(item) > -1){
		return true;
	}else
		return false;
}
Set.prototype.size = function(){
	return this.datastore.length;
};
Set.prototype.union = function(set){
	var tempSet = new Set();
	tempSet.datastore = set.datastore.slice(0);

	this.datastore.map( (el) => {
		if(!tempSet.contains(el)){
			tempSet.add(el);
		}
	});
	return tempSet;
};
Set.prototype.intersection = function(set){
	var tempSet = new Set();

	tempSet.datastore = this.datastore.filter((el) => {
		return set.contains(el);
	});
	return tempSet;
};
Set.prototype.difference = function(set){
	var tempSet = new Set();

	tempSet.datastore = this.datastore.filter((el) => {
		return !set.contains(el);
	});
	return tempSet;
};

exports.Set = Set;