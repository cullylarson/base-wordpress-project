import webpack from 'webpack'
import path from 'path'

const debug = process.env.NODE_ENV !== "production"

export default [
    {
        target: 'web',
        context: __dirname,
        devtool: debug ? "inline-sourcemap" : false,
         entry: [
            'whatwg-fetch',
            path.join(__dirname, "js/main.js"),
        ],
        output: {
            path: path.join(__dirname, "/theme/build/js"),
            filename: "main.js",
        },
        resolve: {
            alias: {
                app: path.resolve(__dirname, 'js'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: 'babel-loader',
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: 'eslint-loader',
                    enforce: 'pre',
                },
            ],
        },
        plugins: debug ? [] : [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        ],
    },
]
