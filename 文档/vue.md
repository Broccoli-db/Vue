### VUE

##### 一，安装Vue3

```vue
命令 pnpm create vue@latest
```

##### 二，Vue2

```
在Vue2中，vue是一个构造函数类，我们使用Vue构建项目，就是创建此类的一个实例！
 vue2采用的OptionsAPI(配置项)
 基于data构建数据
 基于methods创建方法
 基于computed创建计算属性
```

##### 三，在Vue中如何指定视图

```vue
1.基于el配置项指定
	let vm = new Vue({
		el:"#app"
	})
2.基于template 配置项指定
	let vm = new Vue({
		date:{
			name:"张三"，
		}，
		template：`
				 <div>{{name}}</div> 
				 `
	})
	vm.$mount("#app")
3.基于vm.$mount 指定
4.基于render 配置项指定（基于JSX语法构建视图）
```

