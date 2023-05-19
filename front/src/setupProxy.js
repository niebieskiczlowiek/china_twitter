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
<<<<<<< HEAD
=======
      '/api/posts/check_if_liked',
>>>>>>> fb43380a5dce463f9459cb9d4373237fc3d3153b
    ],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};