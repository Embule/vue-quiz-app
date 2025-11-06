<!-- src/components/ProgressBar.vue -->
<template>
  <div class="w-full bg-gray-200 rounded-full h-3">
    <div
      class="bg-indigo-600 h-3 rounded-full transition-all duration-300"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  progress: {
    type: Number as PropType<number>,
    required: true,
  },
});
</script>
