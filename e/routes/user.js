const express = require('express')
const pathLib = require('path')
const fs = require('fs')
const userModel = require('../models/user')

var userRouter = express.Router();

userRouter.get('/', function(req, res, next){
	res.render('test', {name: 'chen weifeng'})
})

userRouter.get('/reg', function(req, res, next){
	res.render('reg')
})
userRouter.post('/reg', function(req, res, next){
	//res.send(req.body)
	const username = req.body.inputUsername
	const password = req.body.inputPassword
	const email = req.body.inputEmail
	const sex = req.body.inputSex
	const avatar = req.files[0].filename + pathLib.parse(req.files[0].originalname).ext
	fs.rename(req.files[0].path, req.files[0].path + pathLib.parse(req.files[0].originalname).ext, function(err){
		if (err) {
			console.log(err)
		}
	})
	
	let user = {
		username: username,
		password: password,
		email: email,
		sex: sex,
		avatar: avatar
	}
	
	userModel.createUser(user, function(jsonRes){
		if (jsonRes.ok){
			res.send('<script>alert("注册成功！");location="/user/login"</script>')
		}else {			
			res.send('<script>alert("注册失败！' + jsonRes.msg + '");location="javascript:history.go(-1)"</script>')
		}
	})
})

userRouter.get('/login', function(req, res, next){
	console.log(req.cookies)
	res.render('login', {cookies:req.cookies})
})


userRouter.get('/logout', function(req, res, next){
	req.session.user = null
	res.redirect('/post/list')
})

userRouter.post('/login', function(req, res, next){
	const username = req.body.inputUsername
	const password = req.body.inputPassword
	const remember = (req.body.rememberMe != null)
	
	let user = {
		username: username,
		password: password
	}
	/*
	userModel.queryUser(user, function(jsonRes){
		if (jsonRes.ok){
			if (jsonRes.data.length < 1) {
				res.send('<script>alert("登录失败！用户不存在！");location="javascript:history.go(-1)"</script>')
			} else {
				if (jsonRes.data[0].password != user.password) {
					res.send('<script>alert("登录失败！用户名或密码错误！");location="javascript:history.go(-1)"</script>')
				} else {
					res.send('<script>alert("登录成功！");location="/post/list"</script>')
				}
			}
		}else {			
			res.send('<script>alert("登录失败！' + jsonRes.msg + '");location="javascript:history.go(-1)"</script>')
		}
	})
	*/
	userModel.verifyUser(user, function(jsonRes){
		if (jsonRes.ok) {
			if (remember) {
				res.cookie('username', username)
				res.cookie('password', password)
			}
			req.session.user = jsonRes.data[0]
			res.send('<script>alert("登录成功！");location="/post/list"</script>')
		}else {
			res.send('<script>alert("登录失败！' + jsonRes.msg + '");location="javascript:history.go(-1)"</script>')
		}
	})
})

module.exports=userRouter;