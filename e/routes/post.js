const express = require('express')

var postRouter = express.Router();

postRouter.get('/', function(req, res, next){
	res.render('test', {name: 'post'})
})

module.exports=postRouter;