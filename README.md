## JS Play [![Build Status](https://secure.travis-ci.org/samarpanda/js-play.svg?branch=master)](http://travis-ci.org/samarpanda/js-play)

> My js playground

## Closure

Clouse is an inner function that has access to the outer functions variables scope chain. It has three scope chains: it has access to own scope, it has access to the outer function variables and it has access to global scope variables.

```js

function greet(name){
	var text = 'Hello ' + name;
	var f = function(){
		return text;
	};
	return f;
}

var helloRam = greet('Ram');
helloRam(); //=> 'Hello Ram'
```