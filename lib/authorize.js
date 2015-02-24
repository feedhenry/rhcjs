var base = require('./base');

module.exports = function(cb){
  var params = {
    url : '/user/authorizations',
    method : 'post',
    body : {
      "scope": "session",
      "note": "FeedHenry/3.0",
      "reuse": true,
      "expires_in" : 15768000 // 6 month expires
    }
  };
  base.apply(this, [params, cb]);
}
