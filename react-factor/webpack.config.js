const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV ?? "development",
  entry: "./src/entrypoint.tsx",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
        // [
        //   {
        //     loader: "babel-loader",
        //     options: {
        //       presets: [
        //         "@babel/preset-env",
        //         ["@babel/preset-react", { runtime: "automatic" }],
        //       ],
        //     },
        //   },
        // ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // Ensure Webpack resolves TS/TSX files
  },
};
