<template>
  <div style="width: 100px; height: 100px" v-background="'red'"></div>
  <Suspense>
    <Slot></Slot>
  </Suspense>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Subassembly",
});
</script>
<script setup>
import { ref, reactive, onMounted } from "vue";
import Slot from "./slot.vue";
</script>
<style scoped lang="scss" ></style>
