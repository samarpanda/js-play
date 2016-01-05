
var test = require('ava');
var p = require('path').resolve;
var l = console.log;

var Grade = require(p('client/src/grade'));

test('#Object valueOf', t => {
	var myGrade = new Grade(0.7);
	t.is(myGrade+'', '0.7');
	t.end();
});

test('#Grad isPassing', t => {
	t.plan(2);

	var grade1 = new Grade(0.8);
	t.true(grade1.isPassing());

	var grade2 = new Grade(0.6);
	t.true(grade2.isPassing());
	t.end();
});

test('#Grad isFailing', t => {
	t.plan(2);

	var grade1 = new Grade(0.5);
	t.false(grade1.isPassing());

	var grade2 = new Grade(0.4);
	t.false(grade2.isPassing());
	t.end();
});