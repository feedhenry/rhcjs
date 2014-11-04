var base = require('./base');

module.exports = function(scope){
  this.show = function(){
    show.apply(scope, arguments);  
  };
  this.create = function(){
    create.apply(scope, arguments);  
  };
  this.del = function(){
    del.apply(scope, arguments);  
  };
  return this;
};


var show = function(params, cb){
      if (!params.app){
        return cb('Must specify an app');
      }      
      params.url = 'domain/' + this.domain + '/application/' + params.app + '?include=cartridges';
      base.apply(this, [params, cb]);
};

var create = function(params, cb){
    if (!params.name || !params.cartridge){
      return cb('Create operations require a name and a cartridge');
    }
    params.url = 'domain/' + this.domain + '/applications';
    params.method = 'post';
    params.body = {
      name : params.name,
      cartridges : [params.cartridge]
    };
    base.apply(this, [params, cb]);
}

var del = function(params, cb){
  // first need to get the id
  var self = this;
  show.apply(this, [params, function(err, res){
    if (err){
      return cb(err);
    }
    var id = res.uuid;
    params.url = '/application/' + id;
    params.method = 'delete';
    base.apply(self, [params, cb]);
  }]);
}
