const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const ejs = require('ejs')
const mysql = require('mysql')
const multer = require('multer')
var mysum = require('./mysum')
/* var dbpool = mysql.createPool({	
  connectionLimit : 10,
  host     : 'www.mycourse.top',
  user     : 'cwf',
  password : '123456',
  database : 'myblog'
});
 */
var upload = multer({ dest: './www/uploads/' })
app.use(bodyParser.urlencoded({extended: false}))
app.use(upload.any())

app.get('/', function(req, res){
	mysum.mydbpool.query("SELECT username, password FROM users WHERE sex='女'", function (error, results, fields) {
		if (error) throw error;
		ejs.renderFile('./views/1.ejs', {name: results}, function(err, str){
			if (err)
				console.log(err)
			else {
				res.send(str)		
			}			
		})
	});	 
})

app.use('/user', require('./routes/user'))

app.use(express.static('./www'))
	

app.listen(3000, function(err) {
	console.log(`Served at port: %s\n`, this.address().port)
})