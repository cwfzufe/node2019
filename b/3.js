const querystring = require('querystring');
var res = querystring.parse('foo=bar&abc=xyz&abc=123');
var aa={}
aa.foo='bar';
console.log(aa);