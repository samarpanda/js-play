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
	filter: function(testFunc){
		var self = this;
		return new Observable(function forEach(){
			return self.forEach(
				function onNext(x){
					if(testFunc(x)){
						observer.onNext(x);
					}
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
	take: function(num){
		var self = this;
		return new Observable(function forEach(){
			var counter = 0,
			subscription = self.forEach(
				function onNext(v){
					observer.onNext(v);
					counter++;
					if(counter === num){
						observer.onCompleted();
						subscription.dispose();
					}
				},
				function onError(e){
					observer.onError(e);
				},
				function onCompleted(){
					observer.onCompleted();
				}
			);
			return subscription;
		});
	}
};

Observable.fromEvent = function(dom, eventName){
	return new Observable(function forEach(observer){
		var handler = e => observer.onNext(e);

		dom.addEventListener(eventName, handler);
		return {
			dispose: () => {
				dom.removeEventListener(eventName, handler);
			}
		};
	});
};