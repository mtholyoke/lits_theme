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

// -- Gather lits_theme JavaScript and SASS --
var lits_theme_files = [ "/components/style.scss" ]
for (var i of modules) { // collect all of the files
  dir = __dirname + i
  // add all the js files
  lits_theme_files = lits_theme_files.concat(glob.sync(dir + src_js))
}

// -- Gather CKEditor  JavaScript and SASS --
// Right now there are no JS files being transpiled for ckeditor5; if that changes you'll need to alter .gitignore
var cke_files = ["/components/02-compounds/ckeditor5/ckeditor5.scss"]

module.exports =  {
    devtool: 'source-map',
    entry: {
      lits_theme: lits_theme_files,
      ckeditor5: cke_files,
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
