rhcjs
=====
OpenShift Node.js module for interfacing with OpenShift from Node.js. 

## Usage

### Install
    
    # install module
    npm install --save rhcjs
    
### Usage - Basic Auth
  
    var rhc = require('rhcjs)({
      username : 'test@test.com',
      password : 'test123',
      target : 'openshift.redhat.com', // optional - defaults to openshift.redhat.com
      domain : 'test' // optional - if ommitted, app operations won't work
    });

### Usage - Bearer Auth
    
    var rhc = require('rhcjs)({
      username : 'test@test.com',
      token : '1a2b3c', // bearer auth token
      domain : 'test'
    });
    
### Specifying a domain after init
This is useful when you need to do a list domains before deciding which one to use with the rhc client. 


### List Apps
    
    rhc.apps(function(err, res){
      // Res will be an array of apps
    });  
  
### Show App Info
    
    rhc.app.show({ app : 'Some app name' }, function(err, res){
      // Res will be app info
    });  
    
### Create App
    
    rhc.app.create({ 
      name : 'Some app name', 
      cartridges : ['Cartridge(s) to create using']
      empty : true|false, // optional - default false. If true, creates with empty git repo
      fromCode : 'git://somePublicGitRepo' // optional - if set, initialises repo with code pulled from specified public git repo
     }, function(err, res){
      
    });  

### Configure an app
    
    rhc.app.configure({ app : 'Some app name', auto_deploy : true, deployment_branch : 'master' }, function(err, res){
      
    });  
    
### Manage environment variables
    
    // List
    rhc.app.env.list({ app : 'Some app name'}, function(err, envvars){});
      
    // Set  
    rhc.app.env.set({ 
      app : 'Some app name',
      vars : [
        { name : 'envVarName', value : 'envVarValue'}
      ]
    }, function(err, envvars){
      
    });
    
    // Unset
    rhc.app.env.unset({ 
      app : 'Some app name',
      vars : [
        { name : 'someVarName' } // note we don't specify the value here to unset
      ]
    });
    
### Delete App
    
    rhc.app.del({ app : 'Some app name' }, function(err, res){
      
    });

### Add SSH Key to user account
    
    rhc.ssh.add({ name : 'Ssh key name', key : 'SSH key content' }, function(err, res){
      
    });  

### Remove an SSH Key
    
    rhc.ssh.remove({ name : 'Ssh key name' }, function(err, res){
      
    });  

### List cartridges

    rhc.cartridges(function(err, res){
      
    });  

### List domains

    rhc.domains.list(function(err, res){
      
    });  
    
### Create domain

    rhc.domains('domainName', function(err, res){
      
    });
  
### Generate Bearer authentication token (initialise rhcjs using username:password)

    rhc.authorize(function(err, res){
      
    });  

### Add Alias

    rhc.alias.add({id : 'appId', name : 'aliasName'}, function(err, createResult){
      
    });
    
## List Aliases

  rhc.alias.create({id : 'appId' }, function(err, aliasesList){
    
  });
  
## Remove Aliases

  rhc.alias.remove({id : 'appId', name : 'aliasName'}, function(err, removeResult){
    
  });
  

### Sample Errors

#### 401

```
{
  "responseBody": "<!DOCTYPE HTML PUBLIC \"-//IETF//DTD HTML 2.0//EN\">\n<html><head>\n<title>401 Authorization Required</title>\n</head><body>\n<h1>Authorization Required</h1>\n<p>This server could not verify that you\nare authorized to access the document\nrequested.  Either you supplied the wrong\ncredentials (e.g., bad password), or your\nbrowser doesn't understand how to supply\nthe credentials required.</p>\n<hr>\n<address>Apache/2.2.15 (Red Hat) Server at openshift.com Port 80</address>\n</body></html>\n",
  "code": 401,
  "error": "Not authenticated (401)",
  "url": "https://invalid:invalid@openshift.com/broker/rest/domain/invalid/applications",
  "method": "post",
  "body": {
    "name": "myfirstapp",
    "cartridges": [
      "diy-1.0"
    ],
    "initial_git_url": "empty"
  }
}
```

#### 422

```
{
  "responseBody": {
    "api_version": 1.3,
    "data": null,
    "messages": [
      {
        "exit_code": 100,
        "field": "name",
        "index": null,
        "severity": "error",
        "text": "The supplied application name 'myfirstapp' already exists"
      }
    ],
    "status": "unprocessable_entity",
    "supported_api_versions": [],
    "type": null,
    "version": "1.3"
  },
  "code": 422,
  "error": "The supplied application name 'myfirstapp' already exists (422)",
  "url": "https://test%40example.com:password@openshift.com/broker/rest/domain/mydomain/applications",
  "method": "post",
  "body": {
    "name": "myfirstapp",
    "cartridges": [
      "diy-0.1"
    ]
  }
}
```

#### 404

```
{
  "responseBody": {
    "api_version": 1.3,
    "data": null,
    "messages": [
      {
        "exit_code": 101,
        "field": null,
        "index": null,
        "severity": "error",
        "text": "Application 'mysecondapp' not found."
      }
    ],
    "status": "not_found",
    "supported_api_versions": [],
    "type": null,
    "version": "1.3"
  },
  "code": 404,
  "error": "Application 'mysecondapp' not found. (404)",
  "url": "https://test%40example.com:password@openshift.com/broker/rest/domain/mydomain/application/mysecondapp?include=cartridges"
}
```
    
## Running Tests
    
    npm test
    

##Or for acceptance tests
    
    export  OPENSHIFT_USERNAME="unamehere"
    export OPENSHIFT_PASSWORD="pwdhere"
    ./node_modules/.bin/mocha -A -u exports --recursive -t 30000 test/accept.js
  
