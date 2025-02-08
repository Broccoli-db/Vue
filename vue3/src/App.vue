<template>
  <div>
    <RouterView />
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
import { RouterView } from "vue-router";
</script>

<style scoped lang="scss" ></style>
