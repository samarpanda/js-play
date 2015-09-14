var fs = require('fs');
var p = require('path').resolve;
var l = console.log;

fs.readdir(p('server/test'), function(err, files){
	if(err){
		return false;
	}

	files.forEach(function(file){
		var f = p('server/test/'+file);
		fs.stat(f, function(err, stats){
			if(err){
				l(err);
			}
			if(!err && stats.isFile())
				require(f);
		});
	});

});