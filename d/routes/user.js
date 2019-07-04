const express = require('express')

var userRouter = express.Router();


// http://localhost:3300/user   +++   /reg  /login

userRouter.get('/', function(req, res, next){
	res.send('GET /')
})

userRouter.get('/reg', function(req, res, next){
	res.send('GET /reg')
})
userRouter.post('/reg', function(req, res, next){
	res.send('POST /reg')
})

userRouter.get('/login', function(req, res, next){
	res.send('GET /login')
})
userRouter.post('/login', function(req, res, next){
	res.send('POST /login')
})

module.exports=userRouter;