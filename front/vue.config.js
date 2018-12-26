module.exports = {
  devServer: {
    host: 'calories.io',
    port: 5002,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
