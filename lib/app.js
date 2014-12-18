var base = require('./base');
var _ = require('underscore');

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
  this.configure = function(){
    configure.apply(scope, arguments);  
  };
  this.start = function(params, cb){
    params.event = 'start';
    startstop.apply(scope, arguments);  
  };
  this.stop = function(params, cb){
    params.event = 'stop';
    startstop.apply(scope, arguments);  
  };
  
  this.env = {
    list : function(params, cb){
      envList.apply(scope, arguments);  
    },
    set : function(){
      envSetUnset.apply(scope, arguments);  
    }, 
    unset : function(){
      envSetUnset.apply(scope, arguments);  
    }
  };
  return this;
};

/*
  Private function to prefetch an app id if it isn't already provided
  
 */
var _prefetch = function(params, cb){
  var self = this;
  if (params.id){
    return cb(null, params);
  }
  show.apply(this, [params, function(err, res){
    if (err){
      return cb.apply(self, [err]);
    }
    params.id = res.uuid;
    return cb.apply(self, [null, params]);
  }]);
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
    if (params.empty){
      params.body.initial_git_url = "empty"
    }
    if (params.fromCode){
      params.body.initial_git_url = params.fromCode
    }
    
    base.apply(this, [params, cb]);
}

var del = function(params, cb){
  // first need to get the id
  var self = this;
  _.bind(_prefetch, this, params, function(err, params){
    if (err){
      return cb(err);
    }
    params.url = '/application/' + params.id;
    params.method = 'delete';
    base.apply(self, [params, cb]);
  })();
}

var configure = function(params, cb){
  var self = this;
  _.bind(_prefetch, this, params, function(err, params){
    if (err){
      return cb(err);
    }
    var id = params.id;
    params.url = '/application/' + id;
    params.method = 'put';
    params.body = {
      deployment_branch : params.deployment_branch,
      auto_deploy : params.auto_deploy
    }
    base.apply(self, [params, cb]);
  })();
}

var startstop = function(params, cb){
  var self = this;
  _.bind(_prefetch, this, params, function(err, params){
    if (err){
      return cb(err);
    }
    var id = params.id;
    params.url = '/application/' + id + '/events';
    params.method = 'post';
    params.body = {
      event : params.event
    }
    base.apply(self, [params, cb]);
  })();
}

var envList = function(params, cb){
  var self = this;
  _.bind(_prefetch, this, params, function(err, params){
    if (err){
      return cb(err);
    }
    var id = params.id;
    params.url = '/application/' + id + '/environment-variables';
    params.method = 'get';
    base.apply(self, [params, cb]);
  })();
}

var envSetUnset = function(params, cb){
  var self = this;
  _.bind(_prefetch, this, params, function(err, params){
    if (err){
      return cb(err);
    }
    var id = params.id;
    params.url = '/application/' + id + '/environment-variables';
    params.method = 'patch';
    params.body = {
      "environment_variables" : params.vars
    };
    base.apply(self, [params, cb]);
  })();
}
