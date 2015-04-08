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

exports.should_create_list_delete_aliases = function(fin){
  this.timeout(60000);
  rhcjs.apps(function(err, apps){
    var appId = _.first(apps).uuid,
    aliasName = 'bars';
    
    // blind remove to ensure tests pass
    rhcjs.alias.remove({ id : appId, name : aliasName }, function(err, removeRes){
      // err is ok here, may not have existed
      rhcjs.alias.add({ id : appId, name : aliasName }, function(err, aliasCreate){
        assert.ok(!err, err);
        assert.ok(aliasCreate);
        
        rhcjs.alias.list({id : appId }, function(err, aliases){
          assert.ok(!err);
          assert.ok(aliases);
          var alias = _.findWhere(aliases, { id : aliasName })
          assert.ok(alias);
          rhcjs.alias.remove({id : appId, name : aliasName}, function(err, removeRes){
            assert.ok(!err, err);
            assert.ok(removeRes);
            return fin();  
          })
        });  
      });
    });
  });
  
}
