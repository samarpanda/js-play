function Observable(forEach){
	this._forEach = forEach;
};

Observable.prototype = {
	forEach: function(onNext, onError, onCompleted){
		if(typeof onNext === 'function'){
			return this._forEach({
				onNext: onNext,
				onError: onError || function(){},
				onCompleted: onCompleted || function(){}
			});
		}else{
			return this._forEach(onNext);
		}
	},
	map: function(projectionFunc){
		var self = this;
		return new Observable(function forEach(observer){
			return self.forEach(
				function onNext(x){
					observer.onNext(projectionFunc(x));
				},
				function onError(e){
					observer.onError(e);
				},
				function onCompleted(){
					observer.onCompleted();
				}
			);
		});
	},
	//TODO: Add this feature
	filter: function(){},
	//TODO: Add this feature
	take: function(){}
};