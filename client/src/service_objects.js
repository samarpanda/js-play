var _ = require('underscore');

var DetermineStudentPassingStatus = function(student){
	this.student = student;
};

DetermineStudentPassingStatus.minimumPassingPercentage = 0.6;

DetermineStudentPassingStatus.prototype = _.extend(DetermineStudentPassingStatus.prototype, {

	fromAssignments: function(assignments){
		return _.compose(
			this.determinePassingStatus,
			this.averageAssignmentGrade,
			this.extractAssignmentGrades
		).call(this, assignments);
	},
	extractAssignmentGrades: function(assignments){
		return _.pluck(assignments, 'grade');
	},
	averageAssignmentGrade: function(grades){
		return grades.reduce(function(memo, grade){
			return memo + grade.percentage;
		}, 0) / grades.length;
	},
	determinePassingStatus: function(averageGrade){
		return averageGrade >= DetermineStudentPassingStatus.minimumPassingPercentage;
	}
});

module.exports = DetermineStudentPassingStatus;