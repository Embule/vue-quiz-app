import { defineStore } from "pinia";
import axios from "axios";
import type { TriviaQuestion } from "@/types/trivia";
import { useShuffle } from "@/composables/useShuffle"

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    questions: [] as TriviaQuestion[],
    answers: [] as string[],
    currentIndex: 0,
  }),

  actions: {
    async fetchQuestions() {
      try {
        const { shuffle } = useShuffle()
        const res = await axios.get(
          "https://opentdb.com/api.php?amount=5&type=multiple"
        );
        const data = res.data;

        this.questions = data.results.map((q: any) => {
          const all = [...q.incorrect_answers, q.correct_answer];
          const shuffled = shuffle(all)

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
      } catch (error) {
        console.error('Failed to fetch questions: ', error)
      }
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