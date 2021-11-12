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
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
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