<template>
  <div>
    <button @click="Click">Toggle</button>
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
const emit = defineEmits();
const Click = () => {
  emit("fn", "Hello");
};
</script>

<style scoped lang="scss" ></style>
