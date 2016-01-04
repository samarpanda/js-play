
var test = require('ava');
var p = require('path').resolve;
var l = console.log;

var DetermineStudentPassingStatus = require(p('client/src/service_objects'));
var Grade = require(p('client/src/grade'));

test('#fromAssignments passing', function(t){
	var student = {};
	var determineStudentPassingStatus = new DetermineStudentPassingStatus(student);
	
	var passing = determineStudentPassingStatus.fromAssignments([
		{'grade': new Grade(0.5)},
		{'grade': new Grade(0.7)}
	]);

	t.is(passing, true);
	t.end();
});

test('#fromAssignments failing', function(t){
	var student = {};
	var determineStudentPassingStatus = new DetermineStudentPassingStatus(student);
	
	var failing = determineStudentPassingStatus.fromAssignments([
		{'grade': new Grade(0.4)},
		{'grade': new Grade(0.7)}
	]);

	t.is(failing, false);
	t.end();
});
