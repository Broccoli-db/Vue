### WebPack

#### 重点：想要对文件资源进行打包必须引入webpack指定的入口文件

##### 一，为什么需要打包工具

```
在开发中，我们会使用框架，ES6模块化语法，Less/Sacc等css预处理器等语法进行开发
这样的代码想在浏览器运行必须经过编译成浏览器识别的JS，Css等语法，才能运行，
所以我们需要打包工具帮我们做完这些事

市面主流的打包工具：
	webpack
	vite
	Rollup
```

##### 二，什么是webPack

```
webPack是一个静态资源打包工具
它会以一个或多个文件作为打包的入口，
将我我们整个项目的所有文件编译组合成一个或多个文件输出出去
输出的文件就是编译好的文件，就可以在浏览器运行了

浏览器本身并不支持Es6中的module语法的，
所以我们需要webPack来进行编译

webPack本身的功能是有限的
	开发模式：仅能编译JS中的Es Module 语法
	生产模式：能编译JS中的Es module 语法，还能压缩JS代码
	本身只能识别Js代码
```

##### 三，如何使用webPack

```js
1.首先创建一个webPack_code文件夹
	webPack_code：
		创建两个文件夹 src public 文件
       src:
			可创建多个JS文件，并在JS文件中写一些导出的函数方法，以及创建一个main.js/index.js作为入口文件，例如：
            JS文件导出的方法；
                export default function sum(a, b) {
                    return a + b;
                }
                export default function count(x, y) {
                    return x + y
                }

			把这些方法使用Es6 module语法导入mian.js/index.js，并输出运行
				import count from './js/count'
                import sum from './js/sum'
                console.log(count(1, 2));
                console.log(sum(1, 2));
       public:
			创建一个index.html文件
			在index.html文件引入main.js/index.js，并允许html
        	<script src="../src/mian.js"></script>
			浏览器此时会报错
            	mian.js:1 Uncaught SyntaxError: Cannot use import statement outside a module (at mian.js:1:1)
			浏览器并不支持Es6 Module语法
            
    所以我们需要使用打包工具来进行对Es6语法的编译，使用webpack			
    使用webPack之前需要初始化package.json
    安装命令 npm init -y 
    会在目录下生成一个package.json文件
        {
          "name": "webpack_code",   //包名称 不能叫webpack，需要修改
          "version": "1.0.0",		//包版本
          "description": "",		//包描述
          "main": "index.js",		//主文件(入口文件)
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"  //运行指令
          },
          "keywords": [],
          "author": "",
          "license": "ISC"
        }
	安装 webpack 插件
    安装命令 npm i webpack webpack-cli -D

	如何使用webpack编译我们的代码,要想打包某一个资源必须引入该资源(入口文件)
    
    ./src/main.js：入口文件路径
	--mode：编译到对应的环境
    		development：开发环境
    		production：生成环境
            
    npx webpack ./src/main.js --mode=development
	npx webpack ./src/main.js --mode=production

打包完成后会在项目根目录文件生成一个dist文件，文件夹下面会有一个main.js
我们重新对public文件下的html文件引入到后的main.js文件
	<script src="../dist/mian.js"></script>
运行html文件，函数则可以正常执行
```

##### 四，webpack的五大核心概念

```
1.entry(入口)
	提示webpack从哪个文件开始打包
2.output(输出)
	提示webpack打包完的文件输出哪里去，如何命名等
3.loader(加载器)
	webPack本身只能处理js,json等资源，其他资源需要借助loader，webpack才能解析
4.plugins(插件)
	扩展webpack的功能
5.mode(模式)
	开发模式：development
	生产模式：producton
```

##### 五，配置Webpack配置文件

```js
在项目根目录下新建文件:webpack.config.js文件，该文件都在node.js环境运行的
webpack文件：
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
        rules: [],
      },
      //插件
      plugins: [],
      //模式
      mode: "development",
    };

可直接运行npx webpack 进行打包

```

##### 六，开发模式

```
1.编译代码，使浏览器能识别运行
	开发时我们有样式资源，图片，html资源等等，webpack默认都不能处理这些资源，
	所以需要我们加载配置编译这些资源
```

##### 七，识别样式资源

```js
webpack本身是不能识别样式资源的，
所以我们需要加载器来帮助webpack处理样式资源

如何使用加载器：
	在webpack.config.js文件导出的对象中下的module对象，
	module对象下添加rules属性(数组)，数组的每一项是对象，
    数组每一项对象下两个属性，test:正则(匹配对应的文件)，use:数组(使用的加载名称，可多个加载器)

module:{
    rules:[
        {
            test:/\.css$/i,
            use:["style-loader","css-loader"]
        }
    ]
}

下载包：
	npm i css-loader style-loader -D

css-loader:将css资源编译成commonjs的模块编译到js中
style-loader:将js中的css样式通过创建style标签添加的html文件中

webpack.config.js文件：
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
            test: /\.css$/,//识别文件尾部名称
            use: ["style-loader", "css-loader"],  //use数组的使用顺序从右到左，从下到上
          },
        ],
      },
      //插件
      plugins: [],
      //模式
      mode: "development",
    };

当我使用了浏览器无法识别的资源，需要我们下载对应的loader，帮助webpack进行编译处理

配置less/scss/sass,注意：scss和sass用的插件以及加载器都是 sass和sass-loader
首先less/scss/sass会被各自对应的加载器编译成css文件，
会被通过style-loader和css-loader编译成浏览器器能识别的代码

webpack.config.js文件
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
        ],
      },
      //插件
      plugins: [],
      //模式
      mode: "development",
    };

```

##### 八，处理图片资源

```js
在webpack4中，我们处理图片资源通过file-loader和url-loader进行处理
在webpack5中，webpack已经将两个loader内置了，所以只需要简单配置既可以处理图片资源
webpack.config.js文件：
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
            test: /\.(png|jpe?g|gif|webp)$/,  //处理对应的图片类型
            type: "asset",
          },
        ],
      },
      //插件
      plugins: [],
      //模式
      mode: "development",
    };

对图片资源进行优化,
小于10kb的图片转为baes64，
减少请求数量，
但是太过的图片资源会导致转义过后，
体积更大，所以控制10kb内

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

```

##### 九，针对各个资源打包到对应的文件目录

```js
path:所有的文件输出路径
filename:入口文件打包的输出文件名
在配置打包编译图片的对象下，添加generator对象
generator对象中添加fliename属性，
属性值需要打包在哪一个文件夹的路径
[hash:10]：随机生成的哈希文件名，只取前10位
static/images/[hash:10][ext][query]

        const path = require("path");
        module.exports = {
          //入口
          entry: "./src/main.js", //x相对路径
          //输出
          output: {
            // 文件的输出路径
            path: path.resolve(__dirname, "dist"), //绝对路径
            // 文件名
            filename: "static/js/main.js", //把入口文件打包到static文件下的js文件
          },
          //加载器
          module: {
            rules: [
              {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
                parser: {
                  dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                  },
                },
                generator: {
                    //[hash:10]:自动生成的哈希值只取前十位
                  filename: "static/images/[hash:10][ext][query]",//把图片文件打包到static文件下的images文件中
                },
              },
            ],
          },
          //插件
          plugins: [],
          //模式
          mode: "development",
        };

```

##### 十，设置每次打包结果都会自动清空上一次的打包结果

```js
在output(出口)对象下添加clean:true即可，
每次重新构建时清除dist文件夹
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
          filename: "static/images/[hash][ext][query]",
        },
      },
    ],
  },
  //插件
  plugins: [],
  //模式
  mode: "development",
};

```

##### 十一，处理字体图标资源

```js
在加载器module下的rules数组中添加
      {
        test: /\.(ttf|woff2?|eot|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "static/font/[hash:10][ext][query]",
        },
      },

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
            test: /\.(ttf|woff2?|eot|svg)$/,
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

```

##### 十二，处理其他资源

```js
处理其他资源与处理文字图标一样
在module（加载器）对象下的rules数组添加
 	{
        test: /\.(ttf|woff2?|eot|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "static/font/[hash:10][ext][query]",
        },
      },
如果需要处理其他资源只需要在test正则中加入对应的资源类型名称
          
          
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
            test: /\.(ttf|woff2?|eot|svg)$/,
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

```

##### 十三，处理js资源

```
为什么要处理js文件代码？？
webpack只能编译Es module语法，不能编译其他语法，导致无法在Ie浏览器运行

兼容处理：使用babel插件处理
代码格式：使用eslint进行要求
```

##### 十三，Eslint

```js
可组装的js和jsx的检查工具
在项目的根目录创建eslint文件，文件可有多种格式。
	旧版本：
        1.  .eslintrc
        2.  .eslintrc.js
        3.  .eslintrc.json
	新版本：
    	1.eslint.config.js
        2.eslint.config.mjs
        3.eslint.config.cjs
        4.eslint.config.ts（需要 附加设置）
        5.eslint.config.mts（需要 附加设置）
        6.eslint.config.cts（需要 附加设置）
举例.eslintrc.js文件
	parserOptions：解析选项
    
	rules：具体配置规则
          	"off" 或 0 - 关闭规则
            "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
            "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)		
    		某一规则："off"(必须是字符串)
            某一规则：0(必须是数字)

	extends：继承其他规则,如果rules写在继承后面，则会覆盖继承的规则
    
	module.exports = {
      parserOptions: {
        ecmaVersion: 6, // ES 语法版本
        sourceType: "module", // ES 模块化
        ecmaFeatures: {
          // ES 其他特性
          jsx: true, // 如果是 React 项目，就需要开启 jsx 语法
        },
      },
      rules: {
        semi: "error", // 禁止使用分号
        "array-callback-return": "warn", // 强制数组方法的回调函数中有 return 语句，否则警告
        "default-case": [
          "warn", // 要求 switch 语句中有 default 分支，否则警告
          { commentPattern: "^no default$" }, // 允许在最后注释 no default, 就不会有警告了
        ],
        eqeqeq: [
          "warn", // 强制使用 === 和 !==，否则警告
          "smart", // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
        ],
      },
      extends: {},
    };

```

