var rhcjs = require('../rhc.js')({
  username : process.env.OPENSHIFT_USERNAME,
  password : process.env.OPENSHIFT_PASSWORD,
  token :   process.env.OPENSHIFT_TOKEN
}),
assert = require('assert'),
_ = require('underscore');

exports.should_list_domains = function(fin){
  rhcjs.domains.list(function(err, domains){
    assert.ok(!err);
    assert.ok(domains);
    var domain = _.first(domains),
    name = domain.id;
    assert.ok(name);
    fin();
  });
}
