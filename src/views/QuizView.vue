<template>
  <div class="max-w-xl mx-auto mt-10">
    <!-- Loading -->
    <div v-if="quiz.loading" class="text-center text-lg">
      Loading questions...
    </div>

    <!-- Error -->
    <div v-else-if="quiz.error" class="text-center text-red-600">
      <p>{{ quiz.error }}</p>
      <button
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        @click="quiz.fetchQuestions()"
      >
        Retry
      </button>
    </div>

    <!-- Question -->
    <div v-else-if="currentQuestion">
      <p class="text-gray-600 mb-4">
        Question {{ quiz.currentIndex + 1 }} of {{ quiz.questions.length }}
      </p>

      <QuestionCard
        :question="currentQuestion.question"
        :answers="currentQuestion.all_answers"
        @selected="handleAnswer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useQuizStore } from "@/store/quizStore";
import QuestionCard from "@/components/QuestionCard.vue";
import { useRouter } from "vue-router";

const quiz = useQuizStore();
const router = useRouter();

onMounted(() => {
  if (quiz.questions.length === 0) {
    quiz.fetchQuestions();
  }
});

const currentQuestion = computed(() => quiz.questions[quiz.currentIndex]);

const handleAnswer = (answer: string) => {
  quiz.selectAnswer(answer);

  // Finished all questions → go to summary
  if (quiz.currentIndex >= quiz.questions.length) {
    router.push({ name: "Summary" });
  }
};
</script>
