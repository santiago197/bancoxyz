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
};
