const  dbPool = require('../libs/myUtil').dbPool

// {ok: , msg: , data: }

module.exports = {
	queryPosts : function(callback) {
		dbPool.query('SELECT * FROM posts ORDER BY posttime DESC', function(err, results, fiels){
			if (err) {
				callback({ok: false, msg: 'database err: '+err.sqlMessage, data: []})
			}else{
				callback({ok: true, data: results})
			}
		})
	}
}
