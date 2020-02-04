//PLUGINS
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
//const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//UTILES
const webpack = require('webpack');


//MODULE
const module_bundle = require('./config/module_bundle');
const entry_bundle = require('./config/entry_bundle');
const html_bundle = require('./config/html_bundle');

//PROPERTY
const env = require('./config/env_property');


const configs = {

    entry : { 
        ...entry_bundle,
      vendor: [env.SRC_PATH + '/js/vue.js', env.SRC_PATH + '/js/axios.js']
    },

    output : {
        path: env.DIST_PATH,
        filename: 'resources/templates/js/[name].js',
        publicPath: env.CONTEXT_PATH
    },

    module : { rules : [ ...module_bundle ] },

    plugins: [
        
        new ExtractTextPlugin("resources/templates/pc/css/[name].bundle.css"),
        //new CleanWebpackPlugin(),

        //new webpack.HotModuleReplacementPlugin(), 
        new WriteFilePlugin({
          test: /^(?!.*(hot)).*/
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        
        ...html_bundle
       
    ],

    optimization: {
      splitChunks: {
        name: "vendor",
        chunks: 'initial'
      }
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100,
        poll: 100
    },

    resolve: {
      alias: {
        '@' : env.SRC_PATH,
        "@class": env.CLASS_PATH
      } 
    },

    externals:[{
      xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],

    devtool : 'source-map'

}

module.exports = configs;