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
数据劫持只发生在new Vue这个阶段
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

##### 七，new Vue

```js
// 在new Vue阶段，Vue内部会处理很多事，其中有一件事：执行initState，在此方法执行中，又做了很多事情
// initProps$1：初始属性
// initMethods:初始methods配置项中的信息
// initData：处理配置项中data中的数据信息的

// initData中处理的事情
//     把data中的数据挂载到实例上
//     并且对data中的每一项数据进行数据劫持(基于Object.defineproperty进行GET/SET劫持，做劫持的目的是：
//     当后续修改数据的时候，会触发SET，在此函数中，不仅仅修改数据值，而且会通知视图更新，实现数据驱动视图的
//     渲染，我们也把做了劫持的数据，称之为响应式数据/状态，
//     )
//     Vue内部会基于递归的方式，对data中的数据进行深度的监听和劫持(只处理对象(普通对象)和数组)
//	   对于Vue来讲，只对data的可枚举，非Symbol和私有属性做数据的代理劫持以及挂在到实例上
//	   不可枚举以及Symbol类型不会做数据劫持代理以及不会挂在实例上
//	   对于数据来讲，数组的每一项成员是数字索引，Vue内部并不会对每一项做GET/SET劫持
//	   它是给数组做了重定向，让数组先指向自己构建的原型对象,通过自己构建的原型对象上
//	   有7个方法：push/pop/shift/unshift/splice/sort/reverse
//     $set:
			vm.$set(object,key,value)
			不能基于$set给vm实例对象设置属性
            但是可以对data中的对象可以设置属性，可以成为响应式
            基于$set修改非响应式的数据，修改后也不会成为响应式的
            基于$set修改数组的值可以让视图发生更新
            
修改数组的值，让视图更新有几种方法
	1.vm.arr.splice(0,1,0)  把数组的第一个项修改为0
    2.vm.$set(vm.arr,0,0)
	3.vm.arr[0]=0 vm.$forceUpdate强制更新
	4.vm.arr=vm.arr.mpa(i=>i+1)
```

##### 八，响应式部分源码

```js
  // 视图更新
  const compiler = ()=>{
      console.log("视图更新");
  }
第一步：
	创建一个observer函数，接收一个对象或者数组，模拟源码数据劫持代理，
    进来判断传参是否是一个对象或者数组，如果都不是则返回参数
    如果是数组则进行数组的处理，需要重新指定原型，并重写7个变异数组方法，数组元素还是数组则继续处理
    如果是对象则进行对象的处理，首先拿到对象所有的key，并且克隆一份对象，完成数据代理
    而后遍历所有key组成的数组，并把每一项进行数据劫持，对象下的属性还是对象则继续处理
	        const observer =(obj)=>{
            // 判断是否为对象
            let isObj = Object.prototype.toString.call(obj) === '[object Object]';
            // 判断是否为数组
            let isArr = Object.prototype.toString.call(obj) === '[object Array]';
            // 不是对象也不是数组，直接返回
            if(!isObj && !isArr) return obj;
            // 数组处理：重新原型指向
            if(isArr){
                observerArr(obj);
                // 递归处理，深层次处理
                obj.forEach((item,index)=> observer(item))
                return obj
            }
            // 对象处理：数据劫持
            let keys = Object.keys(obj);
            // 代理对象
            let proxy={...obj}
            keys.forEach((key)=>{
                observerObj(obj,key,obj[key],proxy)
                // 递归处理，深层次处理
                observer(obj[key])
            })
            return obj
        }
第二步：
	创建一个处理数组的方法，接收一个数组
    首先先创建一个proto对象让传进observer函数的数组指向它，当参数调用7个变异方法时就会调用重写后的
    然后在这proto对象中添加重写7个变异方法，这七个方法不能被枚举，并且proto对象原型要指向Array.prototype，
	调用这7个方法修改数组时，则会通知视图更新
	当参数调用7个方法以外的方法则会找到原生的方法，还需要注意新增方法中的对数组新增元素也要做代理
         //重写的原型对象
        // 添加不可枚举属性，指向原数组
        const def = (obj,key,value,enumerable)=>{
            Object.defineProperty(obj,key,{
                value,
                configurable:true,
                enumerable:!!enumerable,
                writable:true
            })
        }
        let proto={}
        let arrMethods = ['push','pop','shift','unshift','splice','reverse','sort'];
        arrMethods.forEach(name=>{
            def(proto,name,function mutator(...args){
              let res = Array.prototype[name].apply(this,args);
              let inserted;
              switch(name){
                case 'push':
                case 'unshift':
                  inserted = args;
                  break;
                case 'splice':
                  inserted = args.slice(2);
                  break;
              }
              if(Array.isArray(inserted)){
                inserted.forEach(item=>{
                  observer(item)
                })
              }
              compiler()
              return res
            })
        })
        Object.setPrototypeOf(proto,Array.prototype);
        // 数组处理的方法
        const observerArr = (arr)=>{
            //重新指定原型指向
            Object.setPrototypeOf(arr,proto);
        }
第三步：
	创建一个处理对象函数，进行数据劫持，接收三个参数：属性名，属性值，代理的对象，
    首先判断对象是否被冻结，被冻结则不进行劫持，未冻结则用defineProperty进行劫持
    get()方法返回代理的属性值，set方法首先判断新值是否与代理的旧值相同，相同不处理，
    不相同则进行修改，并把修改值在进行数据劫持代理，通知视图更新
            const observerObj = (obj,key,val,proxy)=>{
            // 如果对象是被冻结的，则直接返回
            if(Object.isFrozen(obj)) return;
            Object.defineProperty(obj,key,{
                get(){
                    return proxy[key]
                },
                set(newValue){
                    if(newValue === proxy[key]) return;
                    proxy[key]=observer(newValue);//对于新设置的值进行数据劫持
                    compiler()
                }
            })
        }
```

##### 九，Vue指令

```js
所谓的指令其实就是给标签的设置“自定义指令”，一共15个指令

v-text：更新元素的文本内容。

v-html：更新元素的 innerHTML。

v-show：基于表达式值的真假性，来改变元素的可见性。

v-if：基于表达式值的真假性，来条件性地渲染元素或者模板片段。

v-else：表示 v-if 或 v-if / v-else-if 链式调用的“else 块”。

v-else-if：表示 v-if 的“else if 块”。可以进行链式调用。

v-for：基于原始数据多次渲染元素或模板块。

v-on：给元素绑定事件监听器。
	修饰符：
		.stop - 调用 event.stopPropagation()。
        .prevent - 调用 event.preventDefault()。
        .capture - 在捕获模式添加事件监听器。
        .self - 只有事件从元素本身发出才触发处理函数。
        .{keyAlias} - 只在某些按键下触发处理函数。
        .once - 最多触发一次处理函数。
        .left - 只在鼠标左键事件触发处理函数。
        .right - 只在鼠标右键事件触发处理函数。
        .middle - 只在鼠标中键事件触发处理函数。
        .passive - 通过 { passive: true } 附加一个 DOM 事件。
        
v-bind：动态的绑定一个或多个 attribute，也可以是组件的 prop。

v-model：在表单输入元素或组件上创建双向绑定。
		.lazy - 监听 change 事件而不是 input
        .number - 将输入的合法字符串转为数字
        .trim - 移除输入内容两端空格

v-slot：用于声明具名插槽或是期望接收 props 的作用域插槽。

v-pre：跳过该元素及其所有子元素的编译。

v-once：仅渲染元素和组件一次，并跳过之后的更新。

v-memo：缓存一个模板的子树。
		在元素和组件上都可以使用。
        为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。
        如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过
        
v-cloak：当使用直接在 DOM 中书写的模板时，
		可能会出现一种叫做“未编译模板闪现”的情况：
        用户可能先看到的是还没编译完成的双大括号标签，
        直到挂载的组件将它们替换为实际渲染的内容。
```

##### 十，V-on原理

```js
methods：定义项目中需要的方法
	在new阶段，执行initMethods方法，把methods中的每一项挂载到实例上，(但是经过bind处理的)
	并且基于bind$1(或者nativeBind)，把函数先处理this（把this改为vm实例）
	让函数中的this永远指向当前创建的实例，
	所以不能在methods定义的方法不能是箭头函数
原理：
	基于v-on实现事件绑定，Vue内部是基于addEventListener 实现的事件绑定，Vue内部首先会解释成一个对象
	{
		name："v-on",
		args:["click"],
		vlaue:fn
	}
	元素：addEventListtener("click",function()=>{
		//做很多处理
		fn()
	})
逻辑整理:
	首先在newVue的阶段，Vue内部会执行函数initState函数，在initState函数会处理很多逻辑，
	initProps$1：初始属性
    initMethods:初始methods配置项中的信息
    initData：处理配置项中data中的数据信息的
    等等....
    initMethods函数就是处理Vue中所有的定义好的函数，会把methods中的每一项挂载到vue实例上，
    并且会基于Vue内部的bind$1或者nativeBind，把函数的this指向改为Vue实例，
    当渲染元素的时候Vue发现元素上有v-on或者@符这个指令，并发现绑定了事件，
    那么Vue内部就会用addEventListener对元素进行对应的事件绑定，
    在addEventListener回调函数中首先会处理一些相关逻辑，例如一些修饰符的相关逻辑，
    最后执行v-on绑定的事件

事件委托优惠循环添加事件性能：
	<template>
      <div
        @click="handleClick"
        style="width: 100px; height: 100px; background-color: red"
      >
        <div
          style="
            width: 50px;
            height: 50px;
            background-color: #000;
            margin-bottom: 20px;
          "
          v-for="(i, index) in arr"
          :key="i.id"
          :myIndex="index"
        ></div>
      </div>
    </template>
    <script>
    import { defineComponent } from "vue";
    export default defineComponent({
      name: "App",
    });
    </script>
    <script setup>
    import { ref, reactive, onMounted } from "vue";
    const arr = ref([
      { id: 1, name: "张三", age: 18 },
      { id: 2, name: "李四", age: 19 },
      { id: 3, name: "王五", age: 20 },
      { id: 4, name: "赵六", age: 21 },
      { id: 5, name: "钱七", age: 22 },
      { id: 6, name: "孙八", age: 23 },
      { id: 7, name: "周九", age: 24 },
    ]);
    const handleClick = (e) => {
      console.log(e.target.getAttribute("myIndex"));
    };
    </script>
    <style scoped lang="scss" ></style>
```

##### 十一，v-bind与v-model指令

```vue
v-model:其实就是v-bind：value + @input 的语法糖
    <template>
      <div>
        <input type="text" :value="text" @input="text = $event.target.value" />
        <div>{{ text }}</div>
      </div>
    </template>
    <script>
    import { defineComponent } from "vue";
    export default defineComponent({
      name: "App",
    });
    </script>
    <script setup>
    import { ref, reactive, onMounted } from "vue";
    const text = ref("Hello World");
    </script>
    <style scoped lang="scss" ></style>
```

##### 十二，渲染优化指令

```vue
v-pre:控制Vue在编译视图的时候，跳过这个元素以及后代元素
    <template>
      <div>
        <div v-pre>{{ name }}</div>
      </div>
    </template>

    <script>
    import { defineComponent } from "vue";
    export default defineComponent({
      name: "",
    });
    </script>
    <script setup>
    import { ref, reactive, onMounted } from "vue";
    const name = ref("Vue 3");
    </script>
    <style scoped lang="scss" ></style>
视图所渲染： {{name}}   不会编译

v-cloak：当使用直接在 DOM 中书写的模板时，
		可能会出现一种叫做“未编译模板闪现”的情况：
        用户可能先看到的是还没编译完成的双大括号标签，
        直到挂载的组件将它们替换为实际渲染的内容。
		但是在打包过后，所有的视图模板都是打包在js文件

v-once:仅渲染元素和组件一次，并跳过之后的更新。
```

##### 十三，computed计算属性

```vue
每次视图的渲染或者更新，Vue都会把所有的内容，自上而下，
按照最新的数据值进行编译(编译的结果事虚拟DOM：vnode)
如果是第一次渲染，则直接把vnode渲染渲染真实的DOM，渲染在页面中
如果是视图更新，会拿本次编译的vnode和上一次的vnode进行对比（diff），
把差异的部分创建成对应的补丁包，最后把补丁包的内容进行更新

computed计算属性：
	作用计算缓存，只有computed函数内用到的数值发生变化才会执行，其他属性值发生变化并不会执行
	如果用普通函数做计算，则会在任何的属性值发生变化视图更新，都会导致普通函数重新执行，
	计算结果会被挂载在vue实例上,
	计算结果也会被响应式的数据劫持（GET/SET），但是和data中做的数据劫持是不一样的

	GTE:computedGetter 目的是获取计算属性的值
        首先看有没有缓存的结果
        没有：说明是第一次渲染，则把函数执行，计算一个新的值出来（并把这个值缓存起来）
        有：说明不是第一次渲染，是组件更新，此时再看依赖的状态值是否发生变化
            没变化：直接获取缓存的值
            有变化：把函数重新执行，重新计算新的值（并且再次缓存）
	SET：默认情况下，如果手动修改计算属性的值，会触发SET劫持函数，而此劫持函数中会抛出一个警告错误
    <template>
      <div>
        <div>X:{{ x }}</div>
        <div>Y:{{ y }}</div>
        <div>Z:{{ z }}</div>
        <div>a:{{ a }}</div>
        <button @click="x++">x++</button>
        <button @click="a++">a++</button>
      </div>
    </template>

    <script>
    import { defineComponent } from "vue";

    export default defineComponent({
      name: "",
    });
    </script>
    <script setup>
    import { ref, reactive, onMounted, computed } from "vue";
    const x = ref(0);
    const y = ref(1);
    const a = ref(0);
    // const z = () => {
    //   console.log(123);
    //   return x.value + y.value;
    // };
    const z = computed(() => {
      console.log(123);
      return x.value + y.value;
    });
    </script>

    <style scoped lang="scss" ></style>

接受一个 getter 函数，返回一个只读的响应式 ref 对象。
该 ref 通过 .value 暴露 getter 函数的返回值。
它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。

computed计算属性：传一个函数只能读，传一个对象,可读可写
				{
					get:()=>{},
					set:()=>{}
				}
在new Vue的阶段计算属性是不会执行的，只有当用计算属性的值时，才会执行
```

