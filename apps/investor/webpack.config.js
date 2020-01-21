const { create } = require('../../webpack.config')

const config = create(__dirname)

module.exports = {
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          }
        }
      }
    ],
  }
}
