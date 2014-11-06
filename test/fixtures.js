var nock = require('nock');
var headers = { 'Content-Type': 'application/json' };
var datareply = function(){
  return {"data": { uuid : '1a' }};
};

module.exports = nock('https://openshift.redhat.com')
.filteringRequestBody(function(path) {
  return '*';
})
.get('/broker/rest/applications?include=cartridges', '*')
.reply(200, datareply, headers)
.post('/broker/rest/domain/test/applications', '*')
.reply(200, datareply, headers)
.get('/broker/rest/domain/test/application/foo?include=cartridges')
.times(3)
.reply(200, datareply, headers)
.delete('/broker/rest/application/1a')
.reply(200, datareply, headers)
.put('/broker/rest/application/1a')
.reply(200, datareply, headers)
.get('/broker/rest/user/keys', '*')
.reply(200, datareply, headers)
.delete('/broker/rest/user/keys/foo', '*')
.reply(200, datareply, headers)
.post('/broker/rest/user/keys', '*')
.reply(200, datareply, headers);
