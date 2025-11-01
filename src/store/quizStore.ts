import { defineStore } from "pinia";
import type { TriviaQuestion } from "@/types/trivia";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    questions: [] as TriviaQuestion[],
    answers: [] as string[],
    currentIndex: 0,
  }),

  actions: {
    async fetchQuestions() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await res.json();

      this.questions = data.results.map((q: any) => {
        const all = [...q.incorrect_answers, q.correct_answer];
        const shuffled = all.sort(() => Math.random() - 0.5);

        return {
          question: q.question,
          correct_answer: q.correct_answer,
          incorrect_answers: q.incorrect_answers,
          all_answers: shuffled,
        };
      });
      console.log('data', data)

      this.answers = [];
      this.currentIndex = 0;
    },

    selectAnswer(answer: string) {
      this.answers.push(answer);
      this.currentIndex++;
    },

    resetQuiz() {
      this.answers = [];
      this.currentIndex = 0;
      this.questions = [];
    },
  },
});