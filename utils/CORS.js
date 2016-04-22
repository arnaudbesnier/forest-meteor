Meteor.startup(() => {
  WebApp.rawConnectHandlers.use(function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://app.forestadmin.com');
    response.setHeader('Access-Control-Allow-Headers', [
      'Accept',
      'Accept-Charset',
      'Accept-Encoding',
      'Accept-Language',
      'Accept-Datetime',
      'Authorization',
      'Cache-Control',
      'Connection',
      'Cookie',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'User-Agent',
      'X-Requested-With',
      'Origin'
    ].join(', '));
    response.setHeader('Access-Control-Allow-Methods', ['PUT', 'DELETE']);
    return next();
  });
});
