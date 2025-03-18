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
import {
  ref,
  reactive,
  onMounted,
  useTemplateRef,
  onWatcherCleanup,
} from "vue";
import { RouterView } from "vue-router";
onMounted(() => {
  setFontSize(document.body);
});
function setFontSize(el) {
  const obe = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width } = entry.contentRect;
      const fontSize = width / 100;
      document.body.style.fontSize = `${fontSize}px`;
    }
  });
  return obe.observe(el);
}
</script>

<style scoped lang="scss"></style>
