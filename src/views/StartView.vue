<template>
  <div class="flex justify-center px-4">
    <div class="bg-white p-12 rounded-lg shadow-lg w-full max-w-md mt-20 mb-20">
      <div class="flex flex-col items-center space-y-6">
        <h2 class="text-3xl font-bold text-center">Start Quiz</h2>

        <div class="w-full flex flex-col items-center space-y-6">
          <!-- Loading -->
          <div v-if="quiz.loading">
            <Spinner />
          </div>

          <!-- Error -->
          <div
            v-else-if="quiz.error"
            class="text-center text-red-600 space-y-4"
          >
            <p>{{ quiz.error }}</p>
            <button
              @click="startQuiz"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
            >
              Retry
            </button>
          </div>

          <!-- Difficulty selection and Start-->
          <div v-else class="flex flex-col items-center space-y-6">
            <p class="text-lg">Choose difficulty:</p>

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

            <button
              @click="startQuiz"
              class="px-12 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-200 hover:shadow-lg"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useQuizStore } from "@/store/quizStore";
import Spinner from "@/components/Spinner.vue";

const router = useRouter();
const quiz = useQuizStore();

const levels = ["easy", "medium", "hard"] as const;

const selectDifficulty = (level: "easy" | "medium" | "hard") => {
  quiz.difficulty = level;
};

const startQuiz = async () => {
  await quiz.fetchQuestions();

  // Only navigate if fetch succeeded
  if (!quiz.error) {
    router.push({ name: "Quiz" });
  }
};
</script>
