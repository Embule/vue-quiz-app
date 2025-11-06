import { createRouter, createWebHistory } from 'vue-router'

import QuizView from '@/views/QuizView.vue'
import SummaryView from '@/views/SummaryView.vue'

const routes = [
  { path: '/quiz', component: QuizView, name: 'Quiz' },
  { path: '/summary', component: SummaryView, name: 'Summary' },
  { path: '/', redirect: '/quiz' }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
