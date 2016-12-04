const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const configParts = require('./webpack.parts');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const PATHS = {
    app: path.join(__dirname, 'app'),
    styles: path.join(__dirname, 'styles/main.css'),
    tests: path.join(__dirname, 'tests'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: {
        app: PATHS.app,
        styles: PATHS.styles
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Environment Monitor',
            template: 'templates/index.ejs',
            inject: 'body',
        })
    ]
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            configParts.extractCSS(PATHS.styles),
            {
                devtool: 'source-map',
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash].js',
                    chunkFilename: '[chunkhash].js'
                }
            },
            configParts.minify(),
            configParts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'),
            configParts.extractBundle({
                name: 'vendor',
                entries: ['react']
            }),
            configParts.purifyCSS([PATHS.app]),
            configParts.clean(PATHS.build),
            configParts.adjustJSX(PATHS.app),
            {});
        break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map'
            },
            configParts.setupCSS(PATHS.styles),
            configParts.adjustJSX(PATHS.app),
            configParts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validate(config);