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
  target = this.target.replace(/http(s)?:\/\//, ''),
  fullUrl;
  
  // Yes, request allows basic authentication - but it doesn't send it through many 30* redirects
  if (this.username && this.password){
    authString = encodeURIComponent(this.username) + ':' + encodeURIComponent(this.password) + '@';
  }else if (this.token){
    headers['authorization'] = 'Bearer ' + this.token;
  }else{
    return cb('No auth method provided. Please provide username & password or bearer token');
  }
  
  try{
    fullUrl = url.resolve('https://' + authString + target, fullPath);  
  }catch(err){
    return cb({message : "Error resolving URL string:" , error : err, fullPath : fullPath, target : target });
  }
  
  
  request({
    json : true,
    url : fullUrl,
    method : params.method || 'get',
    body : params.body,
    headers : headers
  }, function(err, response, body){
    if (err){
      return cb(err);
    }
    if (response.statusCode.toString()[0]!=='2'){
      return cb({
        responseBody: body,
        code: response.statusCode,
        error: 'Non-2xx status code',
        url: fullUrl,
        method: params.method,
        body: params.body
      });
    }
    if (typeof body === 'undefined'){
      // Some requests don't return a body
      return cb(null, {ok : true});
    }
    body = body.data || body;
    return cb(null, body);
  });
};
