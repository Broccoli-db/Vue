<template>
  <div class="box">
    <div class="item" @click="show = false" @contextmenu="showMenu"></div>
    <Teleport to="body">
      <div
        class="menu"
        :style="{ top: `${y}px`, left: `${x}px`, height: show ? '100px' : 0 }"
        ref="menu"
      ></div>
    </Teleport>
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
const x = ref(0);
const y = ref(0);
const show = ref(false);
const menu = ref(null);
const showMenu = (e) => {
  e.preventDefault();
  show.value = false;

  setTimeout(() => {
    show.value = true;
    x.value = e.clientX;
    y.value = e.clientY;
  }, 300);
};
</script>

<style scoped lang="scss" src="./index.scss"></style>
