<template>
  <div class="p-6 rounded-xl shadow bg-white space-y-6">
    <!-- Question text -->
    <h2 class="text-xl font-semibold" v-html="question"></h2>

    <!-- Answer options -->
    <div class="flex flex-col gap-3">
      <button
        v-for="(answer, index) in answers"
        :key="index"
        class="border rounded-lg px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:ring"
        @click="select(answer)"
        @keydown.enter="select(answer)"
      >
        <span v-html="answer" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  question: string;
  answers: string[];
}>();

const emit = defineEmits<{
  (e: "selected", answer: string): void;
}>();

const select = (answer: string) => {
  emit("selected", answer);
};
</script>

<style scoped>
/* Optional: improve focus states */
button:focus {
  outline: 2px solid #2563eb; /* blue-600 */
}
</style>
