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
	}
}