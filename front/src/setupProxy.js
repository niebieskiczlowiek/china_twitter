const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    [
      '/api/check',
      '/api/login',
      '/api/posts/add',
      '/api/posts/get',
      '/api/posts/get_tags',
      '/api/hashtags/post',
      '/api/hashtags/get_popular',
    ],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
