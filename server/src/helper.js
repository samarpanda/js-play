//UI: https://dl.dropboxusercontent.com/u/24305000/Screen%20Shot%202015-09-20%20at%208.12.32%20PM.png

/*
var endorsements = [
 { "skill": "css", "user": "Tom"},
 { "skill": "css", "user": "Jaisen"},
 { "skill": "Javascript", "user": "Amit"},
 { "skill": "HTML", "user": "Sean"},
 { "skill": "Javascript", "user": "Bala"},
 { "skill": "css", "user": "Pradeep"}
]

var uidata = [
	{skill: css, users: []}
];

*/

var l = console.log;

var c1 = function(dataArr, sortOrder){
	var obj = {};
	var result = dataArr.filter(function(el, idx, arr){
		var s = el.skill;
		if(!obj.hasOwnProperty(s)){
			obj[s] = idx;
			el['users'] = [];
			el['len'] = 0;
		}
		var myObj = arr[obj[s]];
		myObj['users'].push(el.user);
		myObj.len = myObj['users'].length;
		delete(myObj.user);
		return el.hasOwnProperty('users');
	});
	obj = null;
	if(typeof sortOrder !== 'undefined'){
		if(sortOrder === 1){
			result.sort(descending);
		}else{
			result.sort(ascending);
		}
	}
	return result;
};

var descending = function(a, b){
	var a = a.len, b = b.len;
	return b-a;
};
var ascending = function(a, b){
	var a = a.len, b = b.len;
	return a-b;
};

exports.c1 = c1;
