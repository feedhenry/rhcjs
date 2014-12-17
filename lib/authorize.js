var base = require('./base');

module.exports = function(cb){
  var params = {
    url : '/user/authorizations',
    method : 'post',
    body : {
      "scope": "session",
      "note": "FeedHenry/3.0",
      "reuse": true
    }
  };
  base.apply(this, [params, cb]);
}
