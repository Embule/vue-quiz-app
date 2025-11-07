<template>
  <div
    class="min-h-screen max-w-2xl mx-auto flex justify-center py-20 px-4 bg-red"
  >
    <div class="w-full max-w-2xl">
      <!-- Loading -->
      <div v-if="quiz.loading" class="text-center text-lg">
        <Spinner />
      </div>

      <!-- Error -->
      <div v-else-if="quiz.error" class="text-center text-red-600">
        <p>{{ quiz.error }}</p>
        <button
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          @click="quiz.fetchQuestions()"
          :disabled="quiz.loading"
        >
          Retry
        </button>
      </div>
      <!-- Question -->
      <div v-else-if="currentQuestion">
        <!-- Progress Bar -->
        <ProgressBar :progress="progress" />
        <p class="text-gray-600 mb-4">
          Question {{ quiz.currentIndex + 1 }} of {{ quiz.questions.length }}
        </p>
        <Transition name="slide-right" mode="out-in">
          <QuestionCard
            :key="quiz.currentIndex"
            :question="currentQuestion.question"
            :answers="currentQuestion.all_answers"
            :correct_answer="currentQuestion.correct_answer"
            @selected="handleAnswer"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useQuizStore } from "@/store/quizStore";
import QuestionCard from "@/components/QuestionCard.vue";
import Spinner from "@/components/Spinner.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import { useRouter } from "vue-router";

const quiz = useQuizStore();
console.log("quizstore", quiz);

const router = useRouter();

onMounted(() => {
  if (quiz.questions.length === 0) {
    quiz.fetchQuestions();
  }
});

const currentQuestion = computed(() => quiz.questions[quiz.currentIndex]);

const progress = computed(() => {
  if (quiz.questions.length === 0) return 0;

  // Use +1 so it never reaches 100% before summary
  return ((quiz.currentIndex + 1) / quiz.questions.length) * 100;
});
console.log("progress", progress);

const handleAnswer = (answer: string) => {
  quiz.selectAnswer(answer);

  // After finishing all the questions go to summary
  if (quiz.currentIndex >= quiz.questions.length) {
    router.push({ name: "Summary" });
  }
};
</script>

<style scoped lang="postcss">
/* Slide right transition for questions */
.slide-right-enter-active,
.slide-right-leave-active {
  @apply transition-all duration-300 ease-out;
}

.slide-right-enter-from {
  @apply opacity-0 -translate-x-4; /* start left, invisible */
}

.slide-right-enter-to {
  @apply opacity-100 translate-x-0; /* slide to normal position */
}

.slide-right-leave-from {
  @apply opacity-100 translate-x-0; /* start at normal */
}

.slide-right-leave-to {
  @apply opacity-0 translate-x-4; /* slide to right, invisible */
}
</style>
