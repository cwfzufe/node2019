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
	res.render('login')
})
userRouter.post('/login', function(req, res, next){
	res.send('POST /login')
})

module.exports=userRouter;