var base = require('./base');

module.exports = function(scope){
  this.list = function(){
    list.apply(scope, arguments);  
  };
  this.add = function(){
    add.apply(scope, arguments);  
  };
  
  this.remove = function(){
    remove.apply(scope, arguments);  
  };
  return this;
};


var list = function(params, cb){
      params.url = 'user/keys';
      base.apply(this, [params, cb]);
};

var add = function(params, cb){
    if (!params.name || !params.key){
      return cb('Add key operations require a name and key contents');
    }
    params.url = '/user/keys';
    params.method = 'post';
    var key = params.key.split(' '),
    type = key[0],
    content = key[1];
    params.body = {
      name : params.name,
      content : content,
      type : type
    };
    base.apply(this, [params, cb]);
}

var remove = function(params, cb){
    if (!params.name){
      return cb('Remove key operations require a name');
    }
    params.url = '/user/keys/' + params.name;
    params.method = 'delete';
    base.apply(this, [params, cb]);
}
