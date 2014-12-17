var request = require('request'),
url = require('url'),
path = require('path');
module.exports = function(params, cb){
  var apiBase = 'broker/rest',
  fullPath = path.join(apiBase, params.url),
  authString = '',
  headers = {
    "User-Agent" : "rhcjs",
    "Content-Type" : "application/json"
  },
  fullUrl;
  
  // Yes, request allows basic authentication - but it doesn't send it through many 30* redirects
  if (this.username && this.password){
    authString = this.username + ':' + this.password + '@';
  }else if (this.token){
    headers['authorization'] = 'Bearer ' + this.token;
  }else{
    return cb('No auth method provided. Please provide username & password or bearer token');
  }
  
  fullUrl = url.resolve('https://' + authString + this.target, fullPath);
  
  
  
  request({
    json : true,
    url : fullUrl,
    method : params.method || 'get',
    body : params.body,
    headers : headers
  }, function(err, response, body){
    if (err){
      return cb(err || 'Non-2xx status code');
    }
    if (response.statusCode.toString()[0]!=='2'){
      return cb('Non-2xx status code\n' + JSON.stringify(body));
    }
    if (typeof body === 'undefined'){
      // Some requests don't return a body
      return cb(null, {ok : true});
    }
    body = body.data || body;
    return cb(null, body);
  });
};
