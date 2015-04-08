module.exports = function(params){
  return new rhc(params);
}

function rhc(params){
  var self = this;
  if ((!params.username || !params.password) && !params.token){
    throw new Error('Username and password, or an auth token are required');
  }
  
  this.username = params.username;
  this.password = params.password;
  this.token = params.token;
  this.domain = params.domain;
  this.target = params.target || 'https://openshift.redhat.com';
  
  this.app = require('./lib/app')(this);
  this.ssh = require('./lib/ssh')(this);
  this.domains = require('./lib/domains')(this);
  this.alias = require('./lib/app')(this).alias;
  
  this.setDomain = function(domain){
    self.domain = domain;
  }
}

rhc.prototype.apps = require('./lib/apps.js');
rhc.prototype.cartridges = require('./lib/cartridges.js');
rhc.prototype.authorize = require('./lib/authorize.js');
