(function(){
/**
 * Drag and drop using rx library
 */
var Observable = Rx.Observable;
var dragMe = document.getElementById('drag_me');

var mouseDownStream = Observable.fromEvent(dragMe, 'mousedown');
var mouseMoveStream = Observable.fromEvent(window, 'mousemove');
var mouseUpStream = Observable.fromEvent(window, 'mouseup');

/**
 * Preparing my mouse drag stream
 */
var mouseDrags = mouseDownStream
	.concatMap(function(contactPoint){
		return mouseMoveStream
			.takeUntil(mouseUpStream)
			.map(function(movePoint){
				return {
					x: movePoint.pageX - contactPoint.offsetX,
					y: movePoint.pageY - contactPoint.offsetY
				};
			});
	});

mouseDrags.forEach(function(el){
	dragMe.style.left = el.x+'px';
	dragMe.style.top = el.y+'px';
});

})()