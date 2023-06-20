module.exports = {
  devServer: {
    proxy: {
      '/face': {
        target: 'http://face-interview.online', // 代理的目标地址
        changeOrigin: true,
        pathRewrite: {
          '^/face': '' // 去掉请求路径中的 '/api' 前缀
        }
      }
    }
  }
};