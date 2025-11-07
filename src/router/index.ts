import { createRouter, createWebHistory } from 'vue-router'

import QuizView from '@/views/QuizView.vue'
import SummaryView from '@/views/SummaryView.vue'
import { useQuizStore } from '@/store/quizStore'

const routes = [
  { path: '/quiz', component: QuizView, name: 'Quiz' },
  { path: '/summary', component: SummaryView, name: 'Summary' },
  { path: '/', redirect: '/quiz' }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

// Navigation Guard
router.beforeEach(async (to, from) => {
  const quiz = useQuizStore()

  // User tries to access Summary
  if (to.name === "Summary") {
    const finished =
      quiz.questions.length > 0 &&
      quiz.currentIndex >= quiz.questions.length;

    if (!finished) {
      // If not finished, redirect back to quiz
      return ({ name: "Quiz" });
    }
  }
})


export default router
