var test = require('ava');
var p = require('path').resolve;
var helper = require(p('server/src/helper'));
var l = console.log;

var getData = function(){
	return [
	 { "skill": "css", "user": "Tom"},
	 { "skill": "css", "user": "Jaisen"},
	 { "skill": "Javascript", "user": "Amit"},
	 { "skill": "HTML", "user": "Sean"},
	 { "skill": "Javascript", "user": "Bala"},
	 { "skill": "css", "user": "Pradeep"}
	];
};

var outputDescend = [
	{ skill: 'css', users: [ 'Tom', 'Jaisen', 'Pradeep' ], len: 3 },
	{ skill: 'Javascript', users: [ 'Amit', 'Bala' ], len: 2 },
	{ skill: 'HTML', users: [ 'Sean' ], len: 1 }
];

var outputAscend = [
	{ skill: 'HTML', users: [ 'Sean' ], len: 1 },
	{ skill: 'Javascript', users: [ 'Amit', 'Bala' ], len: 2 },
	{ skill: 'css', users: [ 'Tom', 'Jaisen', 'Pradeep' ], len: 3 }
];

test('Convert to ease ui render', function(t){
	var sampleData = getData();
	t.same(helper.c1(sampleData), outputDescend);
	t.end();
});

test('Ascending order', function(t){
	var sampleData = getData();
	t.same(helper.c1(sampleData, 0), outputAscend);
	t.end();
});

test('Descending order', function(t){
	var sampleData = getData();
	t.same(helper.c1(sampleData, 1), outputDescend);
	t.end();
});