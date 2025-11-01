import { createRouter, createMemoryHistory } from 'vue-router'

import QuizView from '@/views/QuizView.vue'
import SummaryView from '@/views/SummaryView.vue'

const routes = [
  { path: '/quiz', component: QuizView },
  { path: '/summary', component: SummaryView },
  { path: '/', redirect: '/quiz' }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
})

export default router
