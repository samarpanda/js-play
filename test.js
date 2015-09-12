var test = require('ava');

test('foo', function(t){
	t.pass();
	t.end();
});

test('Sample test', (t) => {
	t.same([1,2], [1,2]);
	t.end();
});

test('Planned assertions', (t) => {
	t.plan(1);

	t.pass();

	setTimeout(function(){
		t.pass();
	}, 100);
});