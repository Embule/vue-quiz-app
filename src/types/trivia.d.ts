export interface TriviaQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[]; // after shuffling
}

export interface TriviaAPIResponse {
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}
