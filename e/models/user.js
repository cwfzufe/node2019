const  dbPool = require('../libs/myUtil').dbPool

// {ok: , msg: , data: }

module.exports = {
	createUser : function(user, callback) {
		dbPool.query('INSERT INTO users SET ?', user, function(err, results, fiels){
			if (err) {
				callback({ok: false, msg: 'database err: '+err.sqlMessage})
			}else{
				if (results.affectedRows != 1) {
					callback({ok: false, msg: 'create user failed.'})
				}else{
					callback({ok: true})
				}
			}
		})
	},
	queryUser : function(user, callback) {
		dbPool.query('SELECT * FROM users WHERE username=?', [user.username], function(err, results, fiels){
			if (err) {
				callback({ok: false, msg: 'database err: '+err.sqlMessage})
			}else{
				callback({ok: true, data: results})
			}
		})
	},
	verifyUser : function(user, callback) {
		dbPool.query('SELECT * FROM users WHERE username=? AND password=?', [user.username, user.password], function(err, results, fiels){
			if (err) {
				callback({ok: false, msg: 'database err: '+err.sqlMessage})
			}else{
				if (results.length < 1) {
					callback({ok: false, msg: 'incorrect username or password.'})
				} else {
					callback({ok: true})
				}
			}
		})
	}
}
