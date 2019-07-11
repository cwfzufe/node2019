const  dbPool = require('../libs/myUtil').dbPool

// {ok: , msg: , data: }

module.exports = {
	queryPosts : function(page, callback) {
		dbPool.query('SELECT * FROM posts ORDER BY posttime DESC LIMIT ?, 11', [page*10], function(err, results, fiels){
			if (err) {
				callback({ok: false, msg: 'database err: '+err.sqlMessage, data: []})
			}else{
				callback({ok: true, data: results})
			}
		})
	},
	queryPost : function(postid, callback) {
		dbPool.query('SELECT * FROM posts WHERE Id=?', [postid], function(err, results, fiels){
			if (err) {
				callback({ok: false, msg: 'database err: '+err.sqlMessage, data: []})
			}else{
				callback({ok: true, data: results})
			}
		})
	},
	updatePost : function(post, callback) {
		dbPool.query('UPDATE posts SET title=?, content=? WHERE Id=?', [post.title, post.content, post.postId], function(err, results, fiels){
			if (err) {
				callback({ok: false, msg: 'database err: '+err.sqlMessage, data: []})
			}else{
				if (results.affectedRows != 1) {
					callback({ok: false, msg: 'update post failed.'})
				}else{
					callback({ok: true})
				}
			}
		})
	},
	createPost : function(post, callback) {
		dbPool.query('INSERT INTO posts SET ?', post, function(err, results, fiels){
			if (err) {
				callback({ok: false, msg: 'database err: '+err.sqlMessage, data: []})
			}else{
				if (results.affectedRows != 1) {
					callback({ok: false, msg: 'create post failed.'})
				}else{
					callback({ok: true})
				}
			}
		})
	},
	
	likePost : function(postid, callback) {
		dbPool.query('UPDATE posts SET likecount=likecount+1 WHERE Id=?', postid, function(err, results, fiels){
			if (err) {
				callback({ok: false, msg: 'database err: '+err.sqlMessage, data: []})
			}else{
				if (results.affectedRows != 1) {
					callback({ok: false, msg: 'like post failed.'})
				}else{
					callback({ok: true})
				}
			}
		})
	}	
}
