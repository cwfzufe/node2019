var http = require("http");
var fs = require('fs');
var querystring = require('querystring');
var urlLib = require('url');

var users = {};

var server = http.createServer(function(req, res){
	// 处理GET数据
	var URL = urlLib.parse(req.url, true).pathname;
	var GET = urlLib.parse(req.url, true).query;
	var POST = {};
	var str = '';
	// 处理POST数据
	req.on('data', function(data){
		str += data;
	});
	req.on('end', function(){
		POST = querystring.parse(str);
		console.log(URL)
		
		if (URL=='/user') {
			// 处理user接口相关事务： register / login
			switch (GET.act) {
				case 'reg': 
					if (users[GET.user]) {						
						res.write('user exist! failed!');
						res.end();
					}else {
						users[GET.user] = GET.pass;									
						console.log(users);
						res.write('register successfully!');
						res.end();
					}
					break;
				case 'login':
					if (users[GET.user] == null) {						
						res.write('login failed, user does not exist!');
						res.end();
					} else if (users[GET.user] != GET.pass) {
						res.write('login failed, incorrect user or password!');
						res.end();
					} else {						
						res.write('login successfully!');
						res.end();
					}
					break;
				default:
					res.write('unknown action!');
					res.end();
			}
		} else if (URL=='/search') {
			res.write(`<html>
				<head>
					<title>Nodejs</title>
					<meta http-equiv="refresh" content="1;URL=https://www.baidu.com/s?wd=${GET.keyword}">
				</head>
				<body>
				</body>
				</html>`);
			res.end();
		} else {		
			fs.readFile(URL.substring(1), function(err, data){
				if (err){
					console.log("404");
				} else {			 
					res.write(data);
				}		
				res.end();
			})		
		}
	});	
});
server.listen(8888);