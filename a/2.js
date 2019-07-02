var http = require("http");
var fs = require('fs');

var server = http.createServer(function(req, res){
	console.log(req.url);
	fs.readFile(req.url.substring(1), function(err, data){
		if (err){
			console.log("404");
		} else {			 
			res.write(data);
		}		
		res.end();
	})
	//var data = fs.readFileSync(req.url.substring(1));
	//res.write(data);
	//res.end();
});
server.listen(8888);
