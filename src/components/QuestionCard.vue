<template>
  <div class="bg-white p-12 rounded-lg shadow-lg w-full mt-8 space-y-6">
    <!-- Question -->
    <h2
      class="text-2xl font-bold tracking-tight text-gray-800"
      v-html="question"
    ></h2>

    <!-- Answers -->
    <div class="flex flex-col gap-3">
      <button
        class="block mt-4 hover:bg-gray-300 border border-gray-300 rounded-lg py-2 px-6 text-lg"
        v-for="(answer, i) in answers"
        :key="i"
        :class="[
          'block mt-4 hover:bg-gray-300 border border-gray-300 rounded-lg py-2 px-6 text-lg',
          'w-full text-left px-5 py-3 rounded-xl border bg-white shadow-sm',
          'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
        ]"
        @click="select(answer)"
      >
        <span v-html="answer" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  question: string;
  answers: string[];
  correct_answer: string;
}>();

const emit = defineEmits<{
  (e: "selected", answer: string): void;
}>();

const selectedAnswer = ref<string | null>(null);

// Emit the selected answer to the parent component
const select = (answer: string) => {
  selectedAnswer.value = answer;
  emit("selected", answer);
};
</script>
