const ejs = require('ejs')

ejs.renderFile('./views/1.ejs', {name: 'cwf'}, function(err, str){
	if (err)
		console.log(err)
	else 
		console.log(str)
})