var base = require('./base');

module.exports = function(scope){
  return {
    list : function(){
      list.apply(scope, arguments);
    },
    create : function(){
      create.apply(scope, arguments);  
    }
  }
};

var list = function(cb){
  var params = {
    url : 'domains',
    method : 'get'
  };
  base.apply(this, [params, cb]);
}

var create = function(name, cb){
  var params = {
    url : 'domains',
    method : 'post',
    body : {
      name : name
    } 
  };
  base.apply(this, [params, cb]);
}
