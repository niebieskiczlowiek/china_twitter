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
<<<<<<< HEAD
      '/api/verify',

=======
      '/api/comments/get',
      '/api/posts/get_single',
>>>>>>> 02d9fe125db2d8e68e015db76231b07a7df3ee00
      '/api/posts/check_if_liked',
    ],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};