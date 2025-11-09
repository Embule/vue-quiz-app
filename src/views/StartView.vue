<template>
  <div class="flex justify-center px-4">
    <div class="bg-white p-12 rounded-lg shadow-lg w-full max-w-md mt-20 mb-20">
      <div class="flex flex-col items-center space-y-6">
        <h2 class="text-3xl font-bold text-center">Start Quiz</h2>

        <p class="text-lg">Choose difficulty:</p>

        <!-- Difficulty Buttons -->
        <div class="flex space-x-4">
          <button
            v-for="level in levels"
            :key="level"
            @click="selectDifficulty(level)"
            :class="[
              'px-6 py-2 font-semibold rounded-lg transition-all duration-300',
              quiz.difficulty === level
                ? 'bg-indigo-600 text-white hover:bg-indigo-800'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
            ]"
          >
            {{ level }}
          </button>
        </div>

        <!-- Start Quiz Button -->
        <button
          @click="startQuiz"
          class="px-12 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-200 hover:shadow-lg"
          :disabled="quiz.loading"
        >
          Start Quiz
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useQuizStore } from "@/store/quizStore";

const router = useRouter();
const quiz = useQuizStore();

// Use as const for literal string types instead of generic string
const levels = ["easy", "medium", "hard"] as const;

const selectDifficulty = (level: "easy" | "medium" | "hard") => {
  quiz.difficulty = level;
};

const startQuiz = async () => {
  await quiz.fetchQuestions();
  router.push({ name: "Quiz" });
};
</script>
