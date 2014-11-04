rhcjs
=====
OpenShift Node.js module for interfacing with OpenShift from Node.js. 

## Usage

### Initialize RHC
	# install module
	npm install --save rhcjs
	
	# then require it

	rhc = require('rhcjs)({
	  username : 'test@test.com',
	  password : 'test123',
	  target : 'openshift.redhat.com', // optional - defaults to openshift.redhat.com
  	  domain : 'test' // optional - if ommitted derrived from email in username
	});

### List Apps
    
    rhc.apps(function(err, res){
      // Res will be an array of apps
    });	
	
### Show App Info
    
    rhc.app.show({ app : 'Some app name' }, function(err, res){
      // Res will be an array of apps
    });	
    
### Create App
    
    rhc.app.create({ name : 'Some app name', cartridge : 'Cartridge to create using' }, function(err, res){
      // Res will be an array of apps
    });	
    
### Delete App
    
    rhc.app.del({ app : 'Some app name' }, function(err, res){
      // Res will be an array of apps
    });	
    
## Running Tests
	
	npm test
	
