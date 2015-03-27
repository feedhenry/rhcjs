var request = require('request'),
url = require('url'),
path = require('path');

var HTTP_CODES = {
  400: "The operation could not be completed",
  401: "Not authenticated",
  403: "You are not authorized to perform this operation",
  404: "Not Found",
  409: "The operation could not be completed",
  422: "The operation was not valid",
  500: "The server did not respond correctly. Verify the configured Openshift Service is currently available and accessible",
  503: "The configured Openshift Service is currently unavailable"
};

var parseMessage = function(res, body) {
  // sample res
  // {
  //   "statusCode": 422
  // }
  // 
  // sample body
  // {
  //   "status": "unprocessable_entity",
  //   "messages": [{
  //     "exit_code": 100,
  //     "field": "name",
  //     "index": null,
  //     "severity": "error",
  //     "text": "The supplied application name 'myapp' already exists"
  //   }]
  // }

  var messages = [];
  if (body && body.messages && body.messages instanceof Array && body.messages.length > 0) {
    // parse messages array from body
    body.messages.forEach(function (message) {
      messages.push(message.text);
    });
  } else {
    // use a more generic message based on the status code
    messages.push(HTTP_CODES[res.statusCode] || HTTP_CODES[500]);
  }

  return messages.join('. ') + ' (' + res.statusCode + ')';
};

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
  
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
  
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
      var msg = parseMessage(response, body);
      return cb({
        responseBody: body,
        code: response.statusCode,
        error: msg,
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
