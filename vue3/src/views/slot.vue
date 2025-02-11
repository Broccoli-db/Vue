<template>
  <div>
    <div v-for="item in data" :key="item.id">
      {{ item.title }}
    </div>
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
const data = ref([{ id: 1, title: "title1" }]);
let res = await fetch("/jian/subscriptions/recommended_collections");
data.value = await res.json();
</script>
<style scoped lang="scss" ></style>
