<template>
  <div style="width: 100px; height: 100px" v-background="'red'">
    <SlotApp @fn="fn"> </SlotApp>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Subassembly",
});
</script>
<script setup>
import { ref, reactive, onMounted } from "vue";
import SlotApp from "@/views/slot.vue";
const fn = (mesg) => {
  console.log(mesg);
};
</script>
<style scoped lang="scss" ></style>
