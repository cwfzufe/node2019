module.exports=function(req, res, next){
	if (req.session.user == null) {
		return res.redirect('back')
	}
	next()
}
