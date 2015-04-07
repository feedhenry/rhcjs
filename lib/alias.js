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

var list = function(id, cb){
  var params = {
    url : 'aplication/' + id + '/aliases',
    method : 'get'
  };
  base.apply(this, [params, cb]);
};

var create = function(id, obj, cb){
  var params = {
    url : 'aplication/' + id + '/aliases',
    method : 'post',
    body : obj
  };
  base.apply(this, [params, cb]);
};
