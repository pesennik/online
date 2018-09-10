const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/site.ts',
    output: {
        path: __dirname + '/build/dist',
        filename: 'js/pesennik.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    devtool: "cheap-source-map",
    module: {
        rules: [
            {test: /\.ts(x)?$/, loaders: ['babel-loader', 'ts-loader?silent=true'], exclude: /node_modules/},
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'node_modules/react/umd/react.development.js', to: "js/react.js"},
            {from: 'node_modules/react-dom/umd/react-dom.development.js', to: "js/react-dom.js"},
            {from: 'node_modules/react-redux/dist/react-redux.js', to: "js/react-redux.js"},
            {from: 'node_modules/redux/dist/redux.js', to: "js/redux.js"}
        ])
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-redux": "ReactRedux",
        "redux": "Redux"
    },
    stats: {children: false}
};
