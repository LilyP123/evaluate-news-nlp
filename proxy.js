const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://api.meaningcloud.com/sentiment-2.1',
      changeOrigin: true,
      onProxyReq: function(proxyReq, req, res) {
        console.log('Proxying request to:', proxyReq.path);
    })
  );
};