/* eslint-disable */
var path              = require('path'),
   webpack           = require('webpack'),
   autoprefixer      = require('autoprefixer'),
   uglifyJsPlugin    = webpack.optimize.UglifyJsPlugin;


module.exports = {
   entry: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/Index.jsx'),
   ],
   output: {
      path: __dirname + '/dist',
      filename: 'reduxboilerplate.js',
   },
   module: {
      loaders: [
         {
            // JSX files :
            test: /\.js[x]?$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react',
         },
         {
            // CSS files :
            test: /\.css?$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'style-loader!css-loader!postcss-loader',
         },
         {
            // SCSS files :
            test: /\.scss?$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'style-loader!css-loader!postcss-loader!sass',
         },
      ],
   },
   postcss: [
      autoprefixer({ browsers: ['last 3 versions'] }),
   ],

   resolve: {
      extensions: ['', '.js', '.jsx'],
   },

   plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
         "process.env": {
            NODE_ENV: JSON.stringify("production")
         }
      }),
      new uglifyJsPlugin({
         compress: {
            warnings: false
         }
      }),

        //@PG please validate. appends a date time stamp at beginning of the file.
        new webpack.BannerPlugin('File generated on: ' + new Date())
   ],


   // Create Sourcemaps for the bundle
   devtool: 'source-map',
};
