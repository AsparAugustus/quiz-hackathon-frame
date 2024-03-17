import { NEXT_PUBLIC_URL } from '../config';

// Function to get the total number of questions
export function getTotalQuestions(quizData : any) {
    return quizData.quizzes.length;
  }
  
  // Function to get the options for a specific question
export function getOptionsForQuestion(quizData : any, questionIndex : any) {
    if (questionIndex < 0 || questionIndex >= quizData.quizzes.length) {
      return []; // Return empty array if question index is out of range
    }
    return quizData.quizzes[questionIndex].options;
  }

export function convertOptionstoHTML(options : any, quizNum : any) {
    return options.map((option : any, index : any) => ({
        label: option.answer,
        value: option.answer
        // action: 'post_url',
        // target: `${NEXT_PUBLIC_URL}/api/quiz?currentQuestion=${quizNum}&somethingelse=false`,
      }));
}

export function getQuestion(quizData : any, quizNum : any) {
    return quizData.quizzes[quizNum]
}

