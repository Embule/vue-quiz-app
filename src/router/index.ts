import { createRouter, createWebHistory } from 'vue-router'

import QuizView from '@/views/QuizView.vue'
import SummaryView from '@/views/SummaryView.vue'
import StartView from '@/views/StartView.vue'
import { useQuizStore } from '@/store/quizStore'

const routes = [
  { path: '/', component: StartView, name: 'Start' },
  { path: '/quiz', component: QuizView, name: 'Quiz' },
  { path: '/summary', component: SummaryView, name: 'Summary' },
  { path: '/', redirect: '/quiz' }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

// Navigation guard
router.beforeEach((to, from) => {
  const quiz = useQuizStore();

  // Block /quiz if difficulty not selected or quiz not started
  if (to.name === 'Quiz') {
    if (!quiz.difficulty || quiz.questions.length === 0) {
      return { name: 'Start' }; // redirect to start screen
    }
  }

  // Block /summary if quiz not finished
  if (to.name === 'Summary') {
    const finished =
      quiz.questions.length > 0 &&
      quiz.currentIndex >= quiz.questions.length;

    if (!finished) {
      return { name: 'Quiz' }; // redirect back to quiz
    }
  }

  // Otherwise allow navigation
  return true;
});


export default router
