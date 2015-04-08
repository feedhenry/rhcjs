var rhcLib = require('../rhc.js'),
fixtures = require('./fixtures'),
assert = require('assert'),
rhc;

module.exports = {
  setUp : function(fin){
    rhc = rhcLib({
      username : 'test@test.com',
      password : 'test123',
      domain : 'test'
    });
    return fin();
  },
  'It should list apps' : function(done){
    rhc.apps(function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'It should create an app' : function(done){
    rhc.app.create({ name : 'foo', cartridges : ['nodejs'] }, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'It should show an app' : function(done){
    rhc.app.show({ app : 'foo' }, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'It should read an app' : function(done){
    rhc.app.read({ app : '1a' }, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'it should delete an app' : function(done){
    rhc.app.del({app : 'foo'}, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'it should configure an app' : function(done){
    rhc.app.configure({app : 'foo', auto_deploy : true}, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'it should add an ssh key' : function(done){
    rhc.ssh.add({name : 'foo', key : '1a'}, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'it should list ssh keys' : function(done){
    rhc.ssh.list({}, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'it should remove an ssh key' : function(done){
    rhc.ssh.remove({name : 'foo'}, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'it should list cartridges' : function(done){
    rhc.cartridges(function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'it should start & stop' : function(done){
    rhc.app.start({app : 'foo'}, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      rhc.app.stop({app : 'foo'}, function(err, res){
        assert.ok(!err, err);
        assert.ok(res);
        return done();
      });
    });
  },
  'it should list env vars' : function(done){
    rhc.app.env.list({ app : 'foo'}, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'it should add & remove env vars' : function(done){
    rhc.app.env.set({ app : 'foo', vars : [ { name : 'fooz', value : 'bar' } ]}, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      rhc.app.env.unset({ app : 'foo', vars : [ { name : 'fooz' } ]}, function(err, res){
        assert.ok(!err, err);
        assert.ok(res);
        return done();
      });
      
    });
  },
  'it should add & remove aliases' : function(done){
    rhc.alias.add({ app : 'foo', name : 'fooAlias'}, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      rhc.alias.remove({ app : 'foo', name : 'fooAlias' }, function(err, res){
        assert.ok(!err, err);
        assert.ok(res);
        return done();
      });
    });
  },
  'it should list aliases' : function(done){
    rhc.alias.list({ app : 'foo' }, function(err, res){
      assert.ok(!err, err);
      assert.ok(res);
      return done();
    });
  },
  'it should skip prefetch when an ID is passed' : function(done){
    // The nock.times call on app show validates this works as expected
    rhc.app.configure({id : '1a', auto_deploy : true}, function(err, res){
      return done();
    });
  },
  tearDown : function(fin){
    fixtures.done();
    return fin();
  }
};
