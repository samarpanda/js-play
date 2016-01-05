var _ = require('underscore');

var Grade = function(percentage){
	this.percentage = percentage;
	this.grade = this.grade(percentage);
};

Grade.prototype = _.extend(Grade.prototype, {
	passingGradeLetters: function(){
		return _.chain(Grade.grades)
			.where({passing: true})
			.pluck('letter').value();
	},
	grade: function(percentage){
		return _.find(Grade.grades, function(grade){
			return percentage >= grade.minimumPercentage;
		});
	},
	letterGrade: function(){
		return this.grade.letter;
	},
	isPassing: function(){
		return this.grade.passing;
	},
	isImprovementForm: function(grade){
		return this.isBetterThan(grade);
	},
	isBetterThan: function(grade){
		return this.percentage > grade.percentage;
	},
	valueOf: function(){
		return this.percentage;
	}
});

Grade.grades = [
	{ letter: 'A', minimumPercentage:0.9, passing: true },
	{ letter: 'B', minimumPercentage:0.8, passing: true },
	{ letter: 'C', minimumPercentage:0.7, passing: true },
	{ letter: 'D', minimumPercentage:0.6, passing: true },
	{ letter: 'F', minimumPercentage:0.0, passing: false }
];

module.exports = Grade;