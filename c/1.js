const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const app = express()

var arr = [];
for (var i = 0; i<100000; i++){
	arr.push('session_str' + Math.random())
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('jsdksd'))
app.use(cookieSession({name: 'session',keys: arr}))
app.use(express.static('./www'))

app.get('/cookie', function(req, res){
	res.cookie('name', 'cwf')
	res.send('OK')
})


app.get('/countrefresh', function(req, res){
	console.log(req.session)
	var n = req.session.views || 0
	req.session.views = ++n
	res.send(n + ' views')
})

app.get('/readsession', function(req, res){
	console.log(req.session)
	res.send('OK')
})

app.get('/session', function(req, res){
	req.session['user'] = 'cwf'
	res.send('OK')
})

app.get('/readcookie', function(req, res){
	res.send({cookies: req.cookies, signedCookies: req.signedCookies})
})

app.get('/scookie', function(req, res){		
	res.cookie('name2', 'cwf',{ signed: true } )
	res.send('OK')
})


app.get('/user', function (req, res) {
  console.log(req.query)
  res.send('OK')
})

app.get('/search', function(req, res) {
	res.redirect(`https://www.baidu.com/s?wd=${req.query.keyword}`)
})

app.post('/user', function (req, res) {
  console.log(req.body)
  res.send('OK')
})

 
app.listen(3000)