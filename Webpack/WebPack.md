### WebPack

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

	如何使用webpack编译我们的代码
    
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

