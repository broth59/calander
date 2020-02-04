
//PLUGINS
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//PROCESSOR
const autoprefixer = require('autoprefixer')({grid:true});
const syntax = require('postcss-scss');
//LOADER
const POSTCSS_LOADER = {
    loader: "postcss-loader",
    options: {
      plugins:()=>[autoprefixer],
      syntax
    }
};
//PROP
const env = require('./env_property');

module.exports = [
    {
    //js moduling
        test: /\.js$/,
        exclude: /node_modules/,
        use:[{
            loader: 'babel-loader',
            options: {
                
            }
        }]
    },

    //css moduling
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader",POSTCSS_LOADER]
        })
    },
    {
    test: /\.(scss|sass)/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader", POSTCSS_LOADER]
    })
    },

    //html moduling
    {
        test: /\.(html)$/,
        use : "html-loader"
    },

    //static asset moduling
    {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
        {
            loader: 'url-loader',
            options: {
            limit: 500,
            fallback: {
                loader: 'file-loader',
                options: {
                name: 'resources/templates/img/[name].[ext]?[hash:8]'
                }
            }

            }
            
        }
        ]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
        /* config.module.rule('fonts').use('url-loader') */
            {
                loader: 'file-loader',
                options: {
                    name: 'resources/templates/fonts/[name].[ext]'
                }   
            }
        ]
    }
    ,
    {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'resources/templates/img/[name].[ext]'
                }   
            }
        ]
    }
]