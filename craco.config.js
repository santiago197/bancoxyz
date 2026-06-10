module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Fix ESM "fully specified" resolution for MUI and react-transition-group
      const oneOfRule = webpackConfig.module.rules.find((r) => r.oneOf);
      if (oneOfRule) {
        oneOfRule.oneOf.forEach((rule) => {
          if (rule.resolve) {
            rule.resolve.fullySpecified = false;
          }
        });
      }
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });
      return webpackConfig;
    },
  },
  devServer: {
    proxy: {
      '/proxy/transfer-list': {
        target: 'https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        pathRewrite: { '^/proxy/transfer-list': '/default/transferList' },
      },
      '/proxy/transfer': {
        target: 'https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        pathRewrite: { '^/proxy/transfer': '/default/transfer' },
      },
      '/proxy/balance': {
        target: 'https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        pathRewrite: { '^/proxy/balance': '/default/balance' },
      },
      '/proxy/login': {
        target: 'https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        pathRewrite: { '^/proxy/login': '/default/login' },
      },
    },
  },
};
