<template>
  <div>App</div>
  <div>{{ obj.y }}</div>
  <button
    @click="
      () => {
        obj.y = 20;
      }
    "
  ></button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
<script setup>
import { ref, reactive, onMounted } from "vue";
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
    props.y = val;
  },
});
console.log(obj);
</script>

<style scoped lang="scss"></style>
