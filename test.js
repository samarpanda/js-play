var fs = require('fs');

fs.readdir('test', function(err, files){
	if(err){
		return false;
	}

	files.forEach(function(file){
		require('./test/'+file);
	});

});