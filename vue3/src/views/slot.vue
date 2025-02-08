<template>
  <div class="slot">
    <div>
      <slot name="header" :list="list"></slot>
    </div>
    <div>
      <slot name="main"></slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Slot",
});
</script>
<script setup>
import { ref, reactive, onMounted } from "vue";
const list = ref([
  { name: "张三", age: 18 },
  { name: "李四", age: 19 },
  { name: "王五", age: 20 },
]);
</script>
<style scoped lang="scss" >
</style>
