var test = require('ava');
var p = require('path').resolve;
var arrUtil = require(p('server/src/array'));
var l = console.log;

test('myMap implementation', function(t){
	var arr = [1, 2, 3];
	var result = [2, 3, 4];
	var add1 = function(a){return a + 1;}
	Array.prototype.myMap = arrUtil.myMap;
	t.same(arr.myMap(add1), result);
	t.end();
});

test('myFilter implementation', function(t){
	var arr = [1, 4, 6, 8, 10];
	var result = [6, 8, 10];
	var greaterThan5 = function(a){return a > 5};
	Array.prototype.myFilter = arrUtil.myFilter;

	t.same(arr.myFilter(greaterThan5), result);
	t.end();
});

test('flaten Array', function(t){
var movieLists = [
	{
		name: "New Releases",
		videos: [
			{
				"id": 70111470,
				"title": "Die Hard",
				"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
				"bookmark": []
			},
			{
				"id": 654356453,
				"title": "Bad Boys",
				"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
				"bookmark": [{ id:432534, time:65876586 }]
			}
		]
	},
	{
		name: "Dramas",
		videos: [
			{
				"id": 65432445,
				"title": "The Chamber",
				"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
				"bookmark": []
			},
			{
				"id": 675465,
				"title": "Fracture",
				"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
				"bookmark": [{ id:432534, time:65876586 }]
			}
		]
	}
];
	Array.prototype.concatAll = arrUtil.concatAll;
	var videosIds = movieLists.map(function(el){
		return el.videos.map(function(iel){
			return iel.id;
		});
	});
	t.same(videosIds.concatAll(), [ 70111470, 654356453, 65432445, 675465 ]);
	t.end();
});


test('Flaten a tree 3 level deep', function(t){
	var movieLists = [
	{
		name: "Instant Queue",
		videos : [
			{
				"id": 70111470,
				"title": "Die Hard",
				"boxarts": [
					{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
					{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
				"bookmark": []
			},
			{
				"id": 654356453,
				"title": "Bad Boys",
				"boxarts": [
					{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
					{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
				"bookmark": [{ id:432534, time:65876586 }]
			}
		]
	},
	{
		name: "New Releases",
		videos: [
			{
				"id": 65432445,
				"title": "The Chamber",
				"boxarts": [
					{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
					{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
				"bookmark": []
			},
			{
				"id": 675465,
				"title": "Fracture",
				"boxarts": [
					{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
					{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
					{ width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
				"bookmark": [{ id:432534, time:65876586 }]
			}
		]
	}
];

var output = [
	{ id: 70111470,
	  title: 'Die Hard',
	  url: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg' },
	{ id: 654356453,
	  title: 'Bad Boys',
	  url: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' },
	{ id: 65432445,
	  title: 'The Chamber',
	  url: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg' },
	{ id: 675465,
	  title: 'Fracture',
	  url: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg' }
];
	Array.prototype.concatAll = arrUtil.concatAll;
	Array.prototype.concatMap = arrUtil.concatMap;
	Array.prototype.myReduce = arrUtil.myReduce;

	/**
	* Using map, filter & concatAll
	*/
	var result = movieLists.map(function(mList){
		return mList.videos.map(function(v){
			return v.boxarts.filter(function(ba){
					return ba.width === 150;
				})
				.map(function(ia){
					return {'id': v.id, 'title': v.title,'url': ia.url};
				});
		}).concatAll();
	}).concatAll();

	/**
	* Using map + concatAll = concatMap
	* filter and map
	*/
	var result2 = movieLists.concatMap(function(mList){
		return mList.videos.concatMap(function(v){
			return v.boxarts.filter(function(ba){
				return ba.width === 150;
			})
			.map(function(ia){
				return {'id': v.id, 'title': v.title,'url': ia.url};
			});
		});
	});

	// TODO: Fix me
	var result3 = movieLists.concatMap(function(mList){
		return mList.videos.concatMap(function(v){
			return v.boxarts.myReduce(function(p, el){
				if(typeof p !== 'undefined' && p.width * p.height < el.width * el.height){
					return el;
				}else{
					return el;
				}
			});
			// .map(function(ia){
				// l(ia);
				// return {'id': v.id, 'title': v.title,'url': ia.url};
			// });
		});
	});
	// l(result3);

	t.same(result, output);
	t.same(result2, output);

	t.end();
});


test('Implemented Array.reduce', function(t){
	Array.prototype.myReduce = arrUtil.myReduce;

	var result = [1,2,3,4].myReduce(function(p, el){
		return p + el;
	}, 0);
	var result2 = [1,2,3,4].myReduce(function(p, el){
		return p + el;
	});
	t.is(result, 10);
	t.is(result2, 10);
	t.end();
});


test('Reduce to a different format', function(t){

	var videos = [
		{
			"id": 65432445,
			"title": "The Chamber"
		},
		{
			"id": 675465,
			"title": "Fracture"
		},
		{
			"id": 70111470,
			"title": "Die Hard"
		},
		{
			"id": 654356453,
			"title": "Bad Boys"
		}
	];

	var output = {
		'675465': 'Fracture',
	  '65432445': 'The Chamber',
	  '70111470': 'Die Hard',
	  '654356453': 'Bad Boys'
	};
	Array.prototype.myReduce = arrUtil.myReduce;
	var result = videos.myReduce(function(p, el){
		p[el.id] = el.title;
		return p;
	}, {});

	t.same(result, output);
	t.end();
});


test('Zip implementation', function(t){
	var videos = [
		{
			"id": 70111470,
			"title": "Die Hard",
			"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": 4.0,
		},
		{
			"id": 654356453,
			"title": "Bad Boys",
			"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": 5.0,
		},
		{
			"id": 65432445,
			"title": "The Chamber",
			"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": 4.0,
		},
		{
			"id": 675465,
			"title": "Fracture",
			"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": 5.0,
		}
	],
	bookmarks = [
		{id: 470, time: 23432},
		{id: 453, time: 234324},
		{id: 445, time: 987834}
	];

	var output = [
		{ videoId: 70111470, bookmarkId: 470 },
  	{ videoId: 654356453, bookmarkId: 453 },
  	{ videoId: 65432445, bookmarkId: 445 }
  ];
	Array.zip = arrUtil.zip;

	var result = Array.zip(videos, bookmarks, function(v, b){
		return {videoId:v.id, bookmarkId: b.id};
	});
	t.same(result, output);
	t.end();
});


//TODO: Complete this.
test('', function(t){

var movieLists = [
	{
		name: "New Releases",
		videos: [
			{
				"id": 70111470,
				"title": "Die Hard",
				"boxarts": [
					{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
					{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
				"interestingMoments": [
					{ type: "End", time:213432 },
					{ type: "Start", time: 64534 },
					{ type: "Middle", time: 323133}
				]
			},
			{
				"id": 654356453,
				"title": "Bad Boys",
				"boxarts": [
					{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
					{ width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
				"interestingMoments": [
					{ type: "End", time:54654754 },
					{ type: "Start", time: 43524243 },
					{ type: "Middle", time: 6575665}
				]
			}
		]
	},
	{
		name: "Instant Queue",
		videos: [
			{
				"id": 65432445,
				"title": "The Chamber",
				"boxarts": [
					{ width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
					{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
				"interestingMoments": [
					{ type: "End", time:132423 },
					{ type: "Start", time: 54637425 },
					{ type: "Middle", time: 3452343}
				]
			},
			{
				"id": 675465,
				"title": "Fracture",
				"boxarts": [
					{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
					{ width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
					{ width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
				"interestingMoments": [
					{ type: "End", time:45632456 },
					{ type: "Start", time: 234534 },
					{ type: "Middle", time: 3453434}
				]
			}
		]
	}
];

//Output format: {id, title, interestingmoment-middle, smallest box art url}

});


// Converting from Array to Trees
test('Convert array to Trees', function(t){

	var lists = [
		{
			"id": 5434364,
			"name": "New Releases"
		},
		{
			"id": 65456475,
			"name": "Thrillers"
		}
	],
	videos = [
		{
			"listId": 5434364,
			"id": 65432445,
			"title": "The Chamber"
		},
		{
			"listId": 5434364,
			"id": 675465,
			"title": "Fracture"
		},
		{
			"listId": 65456475,
			"id": 70111470,
			"title": "Die Hard"
		},
		{
			"listId": 65456475,
			"id": 654356453,
			"title": "Bad Boys"
		}
	];

	var output = [
		{ name: 'New Releases', videos: [
				{ id: 65432445, title: 'The Chamber' },
	  		{ id: 675465, title: 'Fracture' }
			]
		},
	  { name: 'Thrillers', videos: [
	  		{ id: 70111470, title: 'Die Hard' },
	  		{ id: 654356453, title: 'Bad Boys' }
	  	]
	  }
	];

	var result = lists.map(function(el){
		return {
			name: el.name,
			videos: videos.filter(function(v){
				return v.listId === el.id;
			}).map(function(vi){
				return {id: vi.id, title: vi.title};
			})
		};
	});

	t.same(result, output);
	t.end();
});

test('linkedin test', function(t){
	var ends = [
		{ "skill": "css", "user": "Tom"},
		{ "skill": "css", "user": "Jaisen"},
		{ "skill": "Javascript", "user": "Amit"},
		{ "skill": "HTML", "user": "Sean"},
		{ "skill": "Javascript", "user": "Bala"},
		{ "skill": "css", "user": "Pradeep"}
	];
	var output = [
		{ skill: 'css', users: [ 'Tom', 'Jaisen', 'Pradeep' ] },
  	{ skill: 'Javascript', users: [ 'Amit', 'Bala' ] },
  	{ skill: 'HTML', users: [ 'Sean' ] }
  ];
	Array.prototype.myReduce = arrUtil.myReduce;

	var obj = {};
	var result = ends.filter(function(el, idx, arr){
		var bool = false;
		if(!obj.hasOwnProperty(el.skill)){
			obj[el.skill] = idx;
			el['users'] = [];
			bool = true;
		}
		arr[obj[el.skill]].users.push(el.user);
		if(bool)
			delete arr[obj[el.skill]].user;
		return bool;
	});

	t.same(result, output);
	t.end();
});


