const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withSvgr = require('next-svgr');

module.exports = withCSS(
  withSass(
    withSvgr({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]'
      },
      webpack(config) {
        config.module.rules.push({
          test: /\.(png|jpg|svg|gif|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        });
        return config;
      },
      webpackDevMiddleware: config => {
        // Work around issues with compilation on Docker for Mac
        // eslint-disable-next-line no-param-reassign
        config.watchOptions = {
          poll: 1000, // Check for changes every second
          aggregateTimeout: 600 // Delay before rebuilding
        };
        return config;
      },
      env: {
        EXTERNAL_API_ENTRYPOINT: (() => {
          return process.env.EXTERNAL_API_ENTRYPOINT;
        })(),
        INTERNAL_API_ENTRYPOINT: (() => {
          return process.env.INTERNAL_API_ENTRYPOINT;
        })(),
        SEGMENT_WRITE_KEY: (() => {
          return process.env.SEGMENT_WRITE_KEY;
        })()
      }
    })
  )
);
