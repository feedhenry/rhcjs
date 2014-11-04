var request = require('request'),
url = require('url'),
path = require('path');
module.exports = function(params, cb){
  var apiBase = 'broker/rest',
  fullPath = path.join(apiBase, params.url),
  fullUrl = url.resolve('https://' + this.username + ':' + this.password + '@' + this.target, fullPath);
  
  request({
    json : true,
    url : fullUrl,
    method : params.method || 'get',
    body : params.body,
    headers : {
      "User-Agent" : "rhcjs",
      "Content-Type" : "application/json"
    }
  }, function(err, response, body){
    if (err || response.statusCode.toString()[0]!=='2'){
      return cb(err || 'Non-2xx status code');
    }
    if (typeof body === 'undefined'){
      // Some requests don't return a body
      return cb(null, {ok : true});
    }
    body = body.data || body;
    return cb(null, body);
  });
};
