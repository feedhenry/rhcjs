module.exports = function(params){
  return new rhc(params);
}

function rhc(params){
  if ((!params.username || !params.password) && !params.token){
    throw new Error('Username and password, or an auth token are required');
  }
  
  this.username = params.username;
  this.password = params.password;
  this.token = params.token;
  this.domain = params.domain || getDomain(params.username);
  this.target = params.target || 'https://openshift.redhat.com';
  
  if (!this.domain){
    throw new Error('Error - could not determine domain. Specify using domain param.');
  }
  
  this.app = require('./lib/app')(this);
  this.ssh = require('./lib/ssh')(this);
}

rhc.prototype.apps = require('./lib/apps.js');
rhc.prototype.cartridges = require('./lib/cartridges.js');
rhc.prototype.authorize = require('./lib/authorize.js');

function getDomain(username){
  if (!username){
    return undefined;
  }
  var rex = /.+@([^.]+).+/,
  match = username.match(rex);
  if (match.length === 2){
    return match[1];
  }
};
