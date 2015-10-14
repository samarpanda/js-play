(function(){

var Observable = Rx.Observable;

var searchInput = document.getElementById('search');
var keypresses = Observable.fromEvent(searchInput, 'keypress');

var getWikiSearchResults = function(query){
	var canelled = false;
	return Observable.create(function(observer){
		var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent(query) + '&callback=?';
		$.getJSON(url, function(data){
			if(!canelled){
				observer.onNext(data[1]);
				observer.onCompleted();
			}
		});
		return function dispose(){
			canelled = true;
		};
	});
};

var searchResultSets =
	keypresses.
		throttle(20).
		map(function(key){
			return searchInput.value;
		}).
		distinctUntilChanged().
		map(function(query){
			return getWikiSearchResults(query);
		}).
		switchLatest();


searchResultSets.forEach(
	function(resultSet){
		console.log(JSON.stringify(resultSet, null, 4));
	},
	function(error){
		console.error(error);
	}
);

})()