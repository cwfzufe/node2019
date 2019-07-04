
const mysql = require('mysql')

module.exports = {
	mysum:	function (){	
		var sum = 0;
		for ( var i = 0; i < arguments.length; i++) {
			sum += arguments[i];
		}
		return sum
	},
	mydbpool: mysql.createPool({	
		connectionLimit : 10,
		host     : 'www.mycourse.top',
		user     : 'cwf',
		password : '123456',
		database : 'myblog'
	}),
	userAct: function(req, res, next){
		console.log(req.query, req.body, req.files)
		res.end()
	}
}

/* module.exports = function (){	
	var sum = 0;
	for ( var i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum
} */