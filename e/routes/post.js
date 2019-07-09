const express = require('express')
const postModel = require('../models/post')

var postRouter = express.Router();

postRouter.get('/list', function(req, res, next){	
	postModel.queryPosts(function(jsonRes){
		res.render('posts', {posts: jsonRes.data})
	})
})

postRouter.get('/list/:postid', function(req, res, next){	
	postModel.queryPosts(function(jsonRes){
		res.render('posts', {posts: jsonRes.data})
	})
})

postRouter.get('/create', function(req, res, next){	
	res.render('createpost')
})

postRouter.post('/create', function(req, res, next){	
	
})

postRouter.get('/edit/:postid', function(req, res, next){	
	res.render('editpost')
})

postRouter.post('/edit', function(req, res, next){	
	
})


module.exports=postRouter;