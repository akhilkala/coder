const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      //TODO: put in env
      target: 'http://api:5000/',
      changeOrigin: true,
    })
  );
};
