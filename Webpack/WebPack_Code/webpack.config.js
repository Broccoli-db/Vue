const path = require("path");
module.exports = {
  //入口
  entry: "./src/main.js", //x相对路径
  //输出
  output: {
    // 文件的输出路径
    path: path.resolve(__dirname, "dist"), //绝对路径
    // 文件名
    filename: "main.js",
  },
  //加载器
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
      },
    ],
  },
  //插件
  plugins: [],
  //模式
  mode: "development",
};
