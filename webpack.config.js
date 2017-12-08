var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
var PROD = process.env.NODE_ENV || "development";
var CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    application: [
        "./assets/js/index.tsx",
      "./assets/css/application.scss"
    ]
  },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    output: {
    filename: "[name].[hash].js",
    path: `${__dirname}/public/assets`
  },
  plugins: [
    new CleanWebpackPlugin([
      "public/assets"
    ], {
      verbose: false,
      watch: true
    }),
    new ExtractTextPlugin("[name].[hash].css"),
    new CopyWebpackPlugin(
      [{
        from: "./assets",
        to: ""
      }], {
        copyUnmodified: true,
        ignore: ["css/**", "js/**"]
      }
    ),
      new CopyWebpackPlugin(
          [{
              from: "./node_modules/react/umd/react.development.js",
              to: ""
          }], {
              copyUnmodified: true
          }
      ),
      new CopyWebpackPlugin(
          [{
              from: "./node_modules/react-dom/umd/react-dom.development.js",
              to: ""
          }], {
              copyUnmodified: true
          }
      ),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ManifestPlugin({
      fileName: "manifest.json"
    })
  ],
  module: {
    rules: [
        {
      test: /\.jsx?$/,
      loader: "babel-loader",
      exclude: /node_modules/
    },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};

if (PROD != "development") {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  );
}
