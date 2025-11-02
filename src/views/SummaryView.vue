<template>
  <div class="max-w-2xl mx-auto mt-10 space-y-8">
    <h2 class="text-3xl font-bold text-center">Summary</h2>

    <!-- Score -->
    <div class="text-center">
      <p class="text-xl font-semibold">
        You got
        <span class="text-blue-600">{{ score }}</span>
        /
        {{ quiz.questions.length }} correct
      </p>
    </div>

    <!-- Answer List -->
    <div class="space-y-6">
      <div
        v-for="(q, index) in quiz.questions"
        :key="index"
        class="p-4 border rounded-lg bg-white shadow"
      >
        <!-- Question -->
        <p class="font-semibold mb-2" v-html="q.question"></p>

        <!-- User Answer -->
        <p>
          <span class="font-medium">Your answer: </span>
          <span
            :class="{
              'text-green-600 font-semibold': isCorrect(index),
              'text-red-600 font-semibold': !isCorrect(index),
            }"
            v-html="quiz.answers[index]"
          />
        </p>

        <!-- Correct Answer -->
        <p class="mt-1">
          <span class="font-medium">Correct answer: </span>
          <span v-html="q.correct_answer"></span>
        </p>
      </div>
    </div>

    <!-- Play Again Button -->
    <div class="text-center">
      <button
        @click="playAgain"
        class="px-12 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Play Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuizStore } from "@/store/quizStore";
import { useRouter } from "vue-router";

const quiz = useQuizStore();
const router = useRouter();

// Compute the total score
const score = computed(
  () =>
    quiz.answers.filter((ans, i) => ans === quiz.questions[i].correct_answer)
      .length
);

// Correctness check
const isCorrect = (index: number) =>
  quiz.answers[index] === quiz.questions[index].correct_answer;

// Reset the quiz and start again
const playAgain = () => {
  quiz.resetQuiz();
  router.push({ name: "Quiz" });
};
</script>
