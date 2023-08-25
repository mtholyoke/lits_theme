// This file tells webpack which files to compile and which loaders to use


const path = require('path');
var glob = require('glob');

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const EmitAllPlugin = require('webpack-emit-all-plugin');

// const src_css = 'css/*.css'
const src_sass = 'scss/*.scss'
const src_js = 'js/*.js'

const DEST_FOLDER = '/app/web/themes/contrib/lits_theme/dist'

// relevant directories
const modules = [
  '/src/'
]


var js_files = []
var sass_files = []
// var css_files = []

for (var i of modules) { // collect all of the files
  // dir = path.resolve(__filename, i)
  dir = __dirname + i
  // add all the js files
  js_files = js_files.concat(glob.sync(dir + src_js))
  // add the sass files
  sass_files = sass_files.concat(glob.sync(dir + src_sass))
  // add the css files
  // css_files = css_files.concat(glob.sync(dir + src_css))
}


module.exports =  {
    devtool: 'source-map',
    entry: {
      lits_theme_scripts: js_files,
      lits_theme_styles: sass_files,
      // CSS: css_files
    },

    output: {
        path: path.resolve(__dirname, DEST_FOLDER),
        filename: '[name].js',
        clean: true, // clear the output folder
    },

    // include the necessary plugins
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css',
      }),
    ],

    stats: 'verbose',

    // do the actual transpiling
    module: {
      rules: [
        // javascript
        {
           test: /\.(js|jsx)$/,
           exclude: /node_modules/,
           use: ['babel-loader']
        },
        // css
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            emitFile: false, // exclude images (Note that file-loader is now deprecated, so Asset Modules might be a better alternative)
          }
        },
        // sass
        {
          test: /\.s(a|c)ss$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
  }
