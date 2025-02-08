<template>
  <div>
    <SlotApp>
      <template #[variables1]="{ list }">
        <div v-for="item in list" :key="item">{{ item.name }}</div>
      </template>
      <template #[variables2]>我是主体</template>
      <template #[variables3]>我是底部</template>
    </SlotApp>
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
const variables1 = ref("header");
const variables2 = ref("main");
const variables3 = ref("footer");
</script>
<style scoped lang="scss" ></style>
