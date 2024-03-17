


export const validateAnswer = (quizData, quizNum, tapped_button) => {
    // Assuming quizData is the object containing your quiz questions and options

    const quiz = quizData.quizzes[quizNum]; // Get the current quiz based on quizNum
    if (!quiz) {
        console.error("Quiz not found!");
        return false; // Return false if quiz is not found
    }

    const correctOptionIndex = quiz.options.findIndex((option) => option.correct); // Find the index of the correct option
    if (correctOptionIndex === -1) {
        console.error("Correct option not found for the current quiz!");
        return false; // Return false if correct option is not found
    }

    // Compare the tapped_button index with the index of the correct option
    return tapped_button === correctOptionIndex;
};
