var base = require('./base');

module.exports = function(cb){
  var params = {
    url : '/applications?include=cartridges',
    method : 'get'
  };
  base.apply(this, [params, cb]);
}
