var grade = function(percentage){
	this.percentage = percentage;
};

grade.prototype.getPercentage = function(){
	return this.percentage;
};

module.exports = grade;