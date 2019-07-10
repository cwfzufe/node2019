const express = require('express')
const postModel = require('../models/post')

var postRouter = express.Router();

postRouter.get('/list', function(req, res, next){
	var page = req.query.page;
	if (page == null) page = 0
	postModel.queryPosts(page, function(jsonRes){
		res.render('posts', {posts: jsonRes.data, page: page})
	})
})

postRouter.get('/list/:postid', function(req, res, next){	
	postModel.queryPosts(function(jsonRes){
		res.render('posts', {posts: jsonRes.data})
	})
})

postRouter.get('/create', require('../libs/checkLogin'), function(req, res, next){	
	res.render('createpost')
})

postRouter.post('/create', require('../libs/checkLogin'), function(req, res, next){	
	const title = req.body.postTitle
	const content = req.body.postContent
	
	let post = {
		title: title,
		author: req.session.user.username,
		content: content
	}
	
	postModel.createPost(post, function(jsonRes){
		if (jsonRes.ok){
			res.send('<script>alert("发布成功！");location="/post/list"</script>')
		}else {			
			res.send('<script>alert("发布失败！' + jsonRes.msg + '");location="javascript:history.go(-1)"</script>')
		}
	})
})

postRouter.get('/edit/:postid', function(req, res, next){
	var postid = req.params.postid
	postModel.queryPost(postid, function(jsonRes){
		if (jsonRes.ok && jsonRes.data.length>0){
			res.render('editpost', {post: jsonRes.data[0]})
		} else {
			res.send('<script>alert("查询失败！' + jsonRes.msg + '");location="javascript:history.go(-1)"</script>')
		}
	})
})

postRouter.post('/edit', function(req, res, next){	
	const title = req.body.postTitle
	const content = req.body.postContent
	const postId = req.body.postId
	
	let post = {
		title: title,
		postId: postId,
		content: content
	}
	
	postModel.updatePost(post, function(jsonRes){
		if (jsonRes.ok){
			res.send('<script>alert("修改成功！");location="/post/list"</script>')
		}else {			
			res.send('<script>alert("修改失败！' + jsonRes.msg + '");location="javascript:history.go(-1)"</script>')
		}
	})
})


module.exports=postRouter;