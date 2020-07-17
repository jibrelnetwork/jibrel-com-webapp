const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const zopfli = require('@gfx/zopfli')

const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const HealthcheckPlugin = require('./healthcheck-webpack-plugin')

const isEnvDevelopment = process.env.NODE_ENV === 'development'
const isEnvProduction = process.env.NODE_ENV === 'production'

const APPS_DIR = path.resolve(__dirname, 'apps')

const create = (dirname) => {
  const isApp = path.resolve(dirname).startsWith(APPS_DIR)

  const OUTPUT_POSTFIX = isApp
    ? path.relative(APPS_DIR, dirname)
    : path.relative(__dirname, dirname)

  const PATHS = {
    INDEX_HTML: path.resolve(__dirname, 'index.html'),
    PACKAGE: path.resolve(dirname, 'package.json'),
    SOURCE: path.resolve(dirname, 'src'),
    OUTPUT: path.resolve(__dirname, 'build', OUTPUT_POSTFIX),
    REPORT: path.resolve(__dirname, 'reports', OUTPUT_POSTFIX),
    PUBLIC: path.resolve(dirname, 'src/public'),
    PACKAGES: path.resolve(__dirname, 'packages'),
    PUBLIC_URL_PATH: '/',
    STATIC_URL_PATH: '/static/',
    PUBLIC_URL: '',
  }

  return {
    mode: isEnvDevelopment ? 'development' : 'production',
    bail: true,
    devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',

    entry: [
      isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
      'index.tsx',
    ].filter(Boolean),

    output: {
      publicPath: PATHS.PUBLIC_URL_PATH,
      path: PATHS.OUTPUT,
      globalObject: 'this',
      pathinfo: isEnvDevelopment,
      filename: 'static/js/[name].[hash:8].js',
      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
      devtoolModuleFilenameTemplate: isEnvDevelopment
        ? info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
        : info =>
          path
            .relative(PATHS.SOURCE, info.absoluteResourcePath)
            .replace(/\\/g, '/'),
    },

    resolve: {
      modules: [
        PATHS.SOURCE,
        path.resolve(dirname, 'node_modules'),
        'node_modules',
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      plugins: [
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(
          PATHS.SOURCE,
          [
            'package.json',
          ],
        ),
      ],
    },

    module: {
      strictExportPresence: true,

      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },

        {
          test: /\.svg$/,
          include: [
            path.resolve(PATHS.SOURCE, 'utils/sprite/icons/monochrome'),
            path.resolve(PATHS.PACKAGES, 'ui/src/Icon/icons/monochrome'),
          ],
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'static/[hash:8].sprite-icons.svg',
              },
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { removeTitle: true },
                  { removeDoctype: true },
                  { removeComments: true },
                  { collapseGroups: true },
                  { convertPathData: true },
                  { removeDimensions: true },
                  { convertTransform: true },
                  { removeUselessDefs: true },
                  { removeUselessStrokeAndFill: true },
                  { removeNonInheritableGroupAttrs: true },
                  { removeStyleElement: true },
                  { removeAttrs: { attrs: '(fill|stroke)' } },
                ],
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          include: [
            path.resolve(PATHS.SOURCE, 'utils/sprite/icons/colored'),
            path.resolve(PATHS.PACKAGES, 'ui/src/Icon/icons/colored'),
          ],
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'static/[hash:8].sprite-colored.svg',
              },
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { removeTitle: true },
                  { removeDoctype: true },
                  { removeComments: true },
                  { collapseGroups: true },
                  { convertPathData: true },
                  { removeDimensions: true },
                  { convertTransform: true },
                  { removeUselessDefs: true },
                  { removeUselessStrokeAndFill: true },
                  { removeNonInheritableGroupAttrs: true },
                  { removeStyleElement: true },
                ],
              },
            },
          ],
        },
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // "url" loader works just like "file" loader but it also embeds
            // assets smaller than specified size as data URLs to avoid requests.
            {
              test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },

            // SCSS modules loader
            {
              test: /\.scss$/,
              include: [
                PATHS.SOURCE,
                PATHS.PACKAGES,
              ],
              use: [
                isEnvDevelopment && require.resolve('style-loader'),
                isEnvProduction && {
                  loader: MiniCssExtractPlugin.loader,
                },
                isEnvDevelopment && require.resolve('@teamsupercell/typings-for-css-modules-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    import: true,
                    modules: {
                      mode: 'local',
                      localIdentName: isEnvDevelopment ?
                        '[path][name]__[local]--[hash:base64:5]' :
                        '[hash:base64:8]',
                    },
                    localsConvention: 'camelCase',
                    importLoaders: 2,
                    sourceMap: isEnvProduction,
                  },
                },
                {
                  // Options for PostCSS as we reference these options twice
                  // Adds vendor prefixing based on your specified browser support in
                  // package.json
                  loader: require.resolve('postcss-loader'),
                  options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      require('autoprefixer')({
                        // FIXME: should use global browsers list, when we start bundle size optimization
                        overrideBrowserslist: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 11',
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                    sourceMap: isEnvProduction,
                  },
                },
                {
                  loader: require.resolve('sass-loader'),
                  options: {
                    implementation: require('sass'),
                    sourceMap: isEnvProduction,
                    sassOptions: {
                      includePaths: [
                        PATHS.SOURCE,
                        PATHS.PACKAGES,
                      ],
                    },
                  },
                },
              ].filter(Boolean),
            },

            // Process JS with Babel.
            {
              test: /\.(ts|tsx|js|jsx)$/,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides',
                ),
                cacheDirectory: true,
                cacheCompression: isEnvProduction,
                compact: isEnvProduction,
                rootMode: 'upward',
              },
              include: [
                PATHS.SOURCE,
                PATHS.PACKAGES,
              ],
            },

            // "file" loader makes sure assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            // This loader don't uses a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              loader: require.resolve('file-loader'),
              // Exclude `js` files to keep "css" loader working as it injects
              // it's runtime that would otherwise processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [
                /\.(js|jsx|ts|tsx|html|json)$/,
                path.resolve(PATHS.SOURCE, 'utils/sprite/icons'),
                path.resolve(PATHS.PACKAGES, 'ui/src/Icon/icons'),
              ],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ].filter(Boolean),
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: PATHS.INDEX_HTML,
      }),

      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      // In production, it will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        NODE_ENV: process.env.NODE_ENV,
        PUBLIC_URL: PATHS.PUBLIC_URL,
        GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
        HOST_CMS: process.env.NODE_ENV === 'production'
          ? '//{{ default .Env.DOMAIN_NAME \"tokenize.jibrel.network\" }}'
          : `//${process.env.DOMAIN_NAME}`
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BUILD_NUMBER': process.env.BUILD_NUMBER || 'dev',
        'process.env.DOMAIN_NAME': JSON.stringify(process.env.DOMAIN_NAME),
        'process.env.API_REQUEST_MAX_ATTEMPTS': JSON.stringify(process.env.API_REQUEST_MAX_ATTEMPTS),
        'process.env.FOLOOSI_MERCHANT_KEY': JSON.stringify(process.env.FOLOOSI_MERCHANT_KEY),
        '__DEV__': isEnvDevelopment,
        '__PROD__': isEnvProduction,
      }),

      new ModuleNotFoundPlugin(path.resolve(dirname, '.')),

      isEnvDevelopment &&
      new webpack.HotModuleReplacementPlugin(),

      isEnvProduction &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),

      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: PATHS.PUBLIC_URL_PATH,
      }),

      // we show bundle size report for production builds only
      // because development builds can differ significantly
      isEnvProduction &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.resolve(PATHS.REPORT, 'bundle-size', 'index.html'),
        openAnalyzer: false,
      }),

      new CopyWebpackPlugin([
        {
          from: 'src/public/**/*',
          to: PATHS.OUTPUT,
          ignore: ['index.html'],
          transformPath: targetPath => targetPath.replace(/src\/public/, ''),
        },
        {
          from: 'src/settings.js',
          to: PATHS.OUTPUT,
          transformPath: targetPath => targetPath.replace(/src/, ''),
        },
      ]),

      new SpriteLoaderPlugin({
        publicPath: PATHS.STATIC_URL_PATH,
      }),

      new HealthcheckPlugin({
        publicPath: PATHS.OUTPUT,
      }),

      // we pack files more than 1kb with gzip in advance
      // to prevent nginx from converting it in run-time
      isEnvProduction &&
      new CompressionPlugin({
        threshold: 1024,
        exclude: [
          /\.map$/,
          /index\.html$/,
        ],
        algorithm(input, compressionOptions, callback) {
          return zopfli.gzip(input, compressionOptions, callback)
        },
      }),
    ].filter(Boolean),

    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: isEnvProduction,
          terserOptions: {
            keep_classnames: /^BigNumber/,
            keep_fnames: /^BigNumber/,
          },
        }),
      ],
    },

    devServer: {
      allowedHosts: [
        '.jibrelcom.local',
      ],
      compress: true,
      clientLogLevel: 'none',
      contentBase: PATHS.PUBLIC,
      watchContentBase: true,
      hot: true,
      publicPath: PATHS.PUBLIC_URL,
      host: '0.0.0.0',
      port: process.env.WEBPACK_DEV_SERVER_PORT || 3000,
      overlay: false,
      historyApiFallback: {
        rewrites: [
          { from: new RegExp(`^/(?!static).*$`), to: `/index.html` },
        ],
      },
    },

    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  }
}

module.exports = {
  ...create(__dirname),
  create,
}
