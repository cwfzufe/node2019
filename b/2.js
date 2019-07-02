var http = require("http");
var fs = require('fs');
var querystring = require('querystring');
var urlLib = require('url');

var server = http.createServer(function(req, res){
	//console.log(req.url);
	// 处理GET数据
	//var arr = req.url.split('?');
	// arr[0]  /user
	// arr[1]  user=zhangsan&pass=1234
	//var GET = querystring.parse(arr[1]);
	var URL = urlLib.parse(req.url, true).pathname;
	var GET = urlLib.parse(req.url, true).query;	
	
	var POST = {};
	var str = '';
	// 处理POST数据
	req.on('data', function(data){
		console.log('data event');
		str += data;
	});
	req.on('end', function(){
		console.log('end event');
		POST = querystring.parse(str);

		console.log(URL, GET, POST);
		
		fs.readFile(URL.substring(1), function(err, data){
			if (err){
				console.log("404");
			} else {			 
				res.write(data);
			}		
			res.end();
		})		
	});	
});
server.listen(8888);