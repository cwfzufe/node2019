var fs = require('fs');

fs.readFile('1.js', function(err, data){
	if (err) throw err;
	console.log(data.toString());
})