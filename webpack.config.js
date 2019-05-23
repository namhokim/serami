module.exports = {
    target: "electron-renderer",
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js'
        }
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader?modules"]
            }
        ]
    },
    entry: {
        "main/index": "./src/main/index.js",
        "renderer/app": "./src/renderer/app.jsx"
    },
    output: {
        filename: "dist/[name].js"
    },
    devtool: "source-map"
};