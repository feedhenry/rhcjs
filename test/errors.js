var rhcjs = require('../rhc.js');
var rhc;
var async = require('async');

/*
expected output

401
Not authenticated (401)
422
The supplied application name <existing_app> already exists (422)
404 app
Application 'invalid' not found. (404)
404 domain
Domain 'invalid' not found. (404)
DONE!
 */

async.series([function(cb) {
  console.log('401');
  rhc = rhcjs({
    username: 'invalid',
    password: 'invalid',
    target: process.env.OPENSHIFT_TARGET,
    domain: 'invalid'
  });
  rhc.app.create({
    name: process.env.OPENSHIFT_EXISTING_APP,
    cartridges: ['diy-1.0'],
    empty: true
  }, function(err, res) {
    console.log(err.error);
    return cb();
  });
}, function(cb) {
  console.log('422');
  rhc = rhcjs({
    username: process.env.OPENSHIFT_USER,
    password: process.env.OPENSHIFT_PASS,
    target: process.env.OPENSHIFT_TARGET,
    domain: process.env.OPENSHIFT_DOMAIN
  });
  rhc.app.create({
    name: process.env.OPENSHIFT_EXISTING_APP,
    cartridges: 'diy-0.1'
  }, function(err, res) {
    console.log(err.error);
    return cb();
  });
}, function(cb) {
  console.log('404 app');
  rhc.app.show({
    app: 'invalid'
  }, function(err, res) {
    console.log(err.error);
    return cb();
  });
}, function(cb) {
  console.log('404 domain');
  rhc = rhcjs({
    username: process.env.OPENSHIFT_USER,
    password: process.env.OPENSHIFT_PASS,
    target: process.env.OPENSHIFT_TARGET,
    domain: 'invalid'
  });
  rhc.app.show({
    app: 'invalid'
  }, function(err, res) {
    console.log(err.error);
    return cb();
  });
}], function() {
  console.log('DONE!');
});