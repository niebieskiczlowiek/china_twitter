const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    [
      '/api/check',
      '/api/login',
      '/api/register',
      '/api/posts/add',
      '/api/posts/get',
      '/api/posts/get_tags',
      '/api/hashtags/update_hashtags',
      '/api/hashtags/get_popular',
      '/api/posts/update_likes',
      '/api/comments/add',
      '/api/verify',
      '/api/comments/get',
      '/api/posts/get_single',
      '/api/posts/check_if_liked',
      '/api/posts/get/hashtag',
    ],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};