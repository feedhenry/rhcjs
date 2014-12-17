var base = require('./base');

module.exports = function(cb){
  var params = {
    url : 'cartridges',
    method : 'get'
  };
  base.apply(this, [params, cb]);
}
