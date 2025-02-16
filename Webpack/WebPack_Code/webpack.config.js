const path = require("path");
module.exports = {
  //入口
  entry: "./src/main.js", //x相对路径
  //输出
  output: {
    // 文件的输出路径
    path: path.resolve(__dirname, "dist"), //绝对路径
    // 文件名
    filename: "static/js/main.js",
    clean: true, //每次重新构建时清除dist文件夹
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
        generator: {
          filename: "static/images/[hash:10][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?|eot|svg|mp4)$/,
        type: "asset/resource",
        generator: {
          filename: "static/font/[hash:10][ext][query]",
        },
      },
    ],
  },
  //插件
  plugins: [],
  //模式
  mode: "development",
};
