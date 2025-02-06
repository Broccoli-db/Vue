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

##### 四，为何在data中写的数据，在视图中可以直接访问？

```
在data中构建的数据，会直接挂载到实例上，作为私有属性
所有在实例上挂载的属性，都可以直接在视图中使用
```

##### 五，为什么非要写在data当中

```
在data编写的数据，是经过数据劫持的，它是响应式的数据，修改数据值，视图会自动更新
在给实例设置的键值对，不是响应式的
```

##### 六，什么叫数据劫持，为什么写在data中的数据就成为响应式的了？

```js
在data中写的数据，都会经历get/set处理 ===》vue2当中
ste劫持：就是当我们修改数据值的时候，会触发其set函数执行，在函数中不仅仅修改数据。而且还会通知视图重新渲染

    let obj = {
      x: 1,
      y: 10,
    };
    let props = { ...obj };

    Object.defineProperty(obj, "y", {
      get() {
        // 当访问属性y的时候触发get函数
        // get函数返回的是什么，y的值就是什么
        // 不能直接返回obj.y，否则会导致死递归
        return props.y;
      },
      set(val) {
        // 当修改属性y的时候，会触发set函数
        // val就是我们新设置的值
        props.y = val;
      },
    });
```

