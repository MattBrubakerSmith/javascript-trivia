var questionViewModel = new QuestionViewModel();

function init() {
    document.getElementById("begin-button").addEventListener("click", (e) => beginQuiz(e));
    document.getElementById("next-button").addEventListener("click", (e) => getQuestion(e));
    document.getElementById("back-button").addEventListener("click", (e) => getQuestion(e));
}

function beginQuiz(e) {
    e.target.setAttribute("disabled", "");
    Quiz.displayQuestion();
    ko.applyBindings(questionViewModel);
    document.getElementById("intro-container").classList.add("d-none");
    document.getElementById("quiz-container").classList.remove("d-none");
}

function completeQuiz(score) {
    document.getElementById("quiz-container").classList.add("d-none");
    document.getElementById("complete-container").classList.remove("d-none");
    document.getElementById("score").innerHTML = score * 10;
    let exclamation = document.getElementById("exclamation");
    switch(score) {
        case 0: {
            exclamation.innerHTML = "Please leave..."
            break;
        }
        case 1: 
        case 2:
        case 3: 
        case 4:
        case 5: {
            exclamation.innerHTML = "You are a beginner...";
            break;
        }
        case 6:
        case 7: {
            exclamation.innerHTML = "You are a novice."
            break;
        }
        case 8: 
        case 9: 
        case 10: {
            exclamation.innerHTML = "YOU ARE AN EXPERT!"
            break;
        }
    }
}

function getQuestion(e) {
    let back = e.target.id === "back-button";
    let iteration = back ? -1 : 1;
    Quiz.displayQuestion(Quiz.getQuestionIndex() + iteration);
    toggleAnswers(!back);
}

// Run init() on load
document.addEventListener("DOMContentLoaded", function() {
    init();
});