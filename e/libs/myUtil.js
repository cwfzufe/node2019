const mysql = require('mysql')

module.exports = {
	dbPool : mysql.createPool({
		connectionLimit: 10,
		host     : 'www.mycourse.top',
		user     : 'cwf',
		password : '123456',
		database : 'myblog'
	})
}