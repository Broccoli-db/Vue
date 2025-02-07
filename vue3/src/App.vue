<template>
  <div>
    <div>X:{{ x }}</div>
    <div>Y:{{ y }}</div>
    <!-- <div>Z:{{ z }}</div> -->
    <div>a:{{ a }}</div>
    <button @click="x++">x++</button>
    <button @click="a++">a++</button>
    <button @click="hndleClick">z++</button>
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
// const z = computed({
//   get() {
//     console.log(123);
//     return x.value + y.value;
//   },
//   set(val) {
//     console.log(val);
//     x.value = val - 1;
//   },
// });
// const hndleClick = () => {
//   z.value++;
// };
</script>

<style scoped lang="scss" ></style>
