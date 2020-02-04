//PLUGINS
const HtmlWebpackPlugin = require('html-webpack-plugin');
//PROP
const env = require('./env_property');

const HTML = ({id, chunks, extension="jsp", extra_path=""})=>{
    if(!chunks)chunks=[id];
    const HTML_DEFAULT = { 
        hash: true, 
        inject: 'body',
        xhtml: true,

        chunks: ['vendor', ...chunks],
        filename: `./WEB-INF/views/pc/male/${extra_path}${id}.${extension}`,
        template: env.VIEWS(id, extension)
    };

    return new HtmlWebpackPlugin(HTML_DEFAULT);
};

module.exports=[

    HTML({ id: 'main'}),
    
]