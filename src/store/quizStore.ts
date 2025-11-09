import { defineStore } from "pinia";
import axios from "axios";
import type { TriviaQuestion } from "@/types/trivia";
import { useShuffle } from "@/composables/useShuffle"

/*
  Quiz Store:
  - Handles fetching questions from the Trivia API
  - Tracks user answers and current progress
  - Manages loading/error state
  - Stores the chosen difficulty for the quiz
*/

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    questions: [] as TriviaQuestion[],
    answers: [] as string[],
    currentIndex: 0,
    loading: false,
    error: '' as string,
    difficulty: 'easy' as 'easy' | 'medium' | 'hard' | '',
  }),

  actions: {
    async fetchQuestions() {
      this.loading = true;
      this.error = '';

      try {
        const { shuffle } = useShuffle()

        // Build API URL based on difficulty chosen by user
        const url = this.difficulty
          ? `https://opentdb.com/api.php?amount=5&type=multiple&difficulty=${this.difficulty}`
          : `https://opentdb.com/api.php?amount=5&type=multiple`;

        const res = await axios.get(url);
        const data = res.data;

        /*
          Transform raw API questions into internal format; 
          Shuffle answer order using Fisher-Yates composable function
        */
        this.questions = data.results.map((q: any) => {
          const all = [...q.incorrect_answers, q.correct_answer];
          const shuffled = shuffle(all)

          return {
            question: q.question,
            correct_answer: q.correct_answer,
            incorrect_answers: q.incorrect_answers,
            all_answers: shuffled,
            difficulty: q.difficulty,
          };
        });

        // Reset quiz progress
        this.answers = [];
        this.currentIndex = 0;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch questions'
        console.error('Failed to fetch questions: ', error)
      } finally {
        this.loading = false
      }
    },

    //Store the user's selected answer and advance to the next question
    selectAnswer(answer: string) {
      this.answers.push(answer);
      this.currentIndex++;
    },

    // Reset the entire quiz state
    resetQuiz() {
      this.answers = [];
      this.currentIndex = 0;
      this.questions = [];
    },
  },
});