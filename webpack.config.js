// This file tells webpack which files to compile and which loaders to use


const path = require('path');
var glob = require('glob');
const globImporter = require('node-sass-glob-importer');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const src_css = 'css/*.css'
const src_js = '**/*.js'

const DEST_FOLDER = '/app/web/themes/contrib/lits_theme/dist'

// relevant directories
const modules = [
  '/components/'
]


var js_files = []
var sass_files = ["/components/style.scss"] // all of the sass files to include are managed inside of style.scss

for (var i of modules) { // collect all of the files
  dir = __dirname + i
  // add all the js files
  js_files = js_files.concat(glob.sync(dir + src_js))
}


module.exports =  {
    devtool: 'source-map',
    entry: {
      lits_theme: js_files,
      lits_theme_styles: sass_files,
    },

    output: {
        path: path.resolve(__dirname, DEST_FOLDER),
        filename: '[name].js',
        clean: true, // clear the output folder
    },

    // include the necessary plugins
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'lits_theme.css',
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
        // sass
        {
          test: /\.s(a|c)ss$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', {
            loader: "sass-loader",
            options: {
              sassOptions: {
                importer: globImporter()
              }
            }
          }]
        }
      ]
    },
  }
