import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionsState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

// import { shuffleArray } from "./utils";

// export type Question = {
//   category: string;
//   correct_answer: string;
//   difficulty: string;
//   incorrect_answers: string[]; // Corrected to plural
//   question: string;
//   type: string;
// };

// export type QuestionState = Question & { answers: string[] };

// export enum Difficulty {
//   EASY = "easy",
//   MEDIUM = "medium",
//   HARD = "hard",
// }

// export const fetchQuizQuestions = async (
//   amount: number,
//   difficulty: Difficulty
// ): Promise<QuestionState[]> => {
//   const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

//   try {
//     const response = await fetch(endPoint);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data.results || !Array.isArray(data.results)) {
//       throw new Error("Unexpected API response format");
//     }

//     return data.results.map((question: Question) => {
//       if (!Array.isArray(question.incorrect_answers)) {
//         throw new Error("Incorrect answers field is not an array");
//       }

//       return {
//         ...question,
//         answers: shuffleArray([
//           ...question.incorrect_answers,
//           question.correct_answer,
//         ]),
//       };
//     });
//   } catch (error) {
//     console.error("Error fetching quiz questions:", error);
//     return [];
//   }
// };
