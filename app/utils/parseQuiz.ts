// Function to get the total number of questions
export function getTotalQuestions(quizData) {
    return quizData.quizzes.length;
  }
  
  // Function to get the options for a specific question
export function getOptionsForQuestion(quizData, questionIndex) {
    if (questionIndex < 0 || questionIndex >= quizData.quizzes.length) {
      return []; // Return empty array if question index is out of range
    }
    return quizData.quizzes[questionIndex].options;
  }