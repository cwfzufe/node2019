const express = require('express')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const multer = require('multer')
var app = express()
// 设置模板引擎
app.set('views', './views')
app.set('view engine', 'ejs')
// 设置cookie
app.use(cookieParser('sdkfsjkf'))
// 设置session
var sessionArr = [];
for (var i = 0; i < 100000; i++) {
	sessionArr.push('keys_' + Math.random())
}
app.use(cookieSession({name:'session_id', keys: sessionArr, maxAge: 20*60*1000}))
// 设置post数据处理中间件
app.use(bodyParser.urlencoded({extended: true}))
// 设置上传文件处理中间件
app.use(multer({dest: './public/upload'}).any())
// 处理接口路由
app.use('/user', require('./routes/user'))
app.use('/post', require('./routes/post'))
// 静态文件目录
app.use(express.static('./public'))
app.listen(8888, function(){
	console.log('server is running at port %s', this.address().port)
})


