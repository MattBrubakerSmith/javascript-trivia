function init() {
    var qvm = new QuestionViewModel();
    ko.applyBindings(qvm);

    document.getElementById("begin-button").addEventListener("click", (e) => beginQuiz(e, qvm));
    document.getElementById("next-button").addEventListener("click", () => nextQuestion(qvm));
    document.getElementById("back-button").addEventListener("click", () => previousQuestion(qvm));
}

const QuestionManager = (function () {
    let instance;

    function createInstance() {
        let unansweredQuestions = [
            new Question("Why?", [
                new Answer("Cuz", true),
                new Answer("Why not?"),
                new Answer("Why not?"),
                new Answer("Why not?")
            ]),
            new Question("How are you?", [
                new Answer("Fine."),
                new Answer("Great!"),
                new Answer("Define \"How\"", true),
                new Answer("Dead!")
            ])
        ];

        let answeredQuestions = [];
        let answeredIndex = -1;

        return {
            getRandomQuestion: function () {
                let q;
                if (unansweredQuestions.length > 0) {
                    let index = Math.floor(Math.random() * Math.floor(unansweredQuestions.length));
                    q = unansweredQuestions.splice(index, 1)[0];
                    answeredQuestions.push(q);
                    answeredIndex++;
                }
                return q;
            },
            getAnsweredQuestion: function (index) {
                index = index || answeredIndex;
                let q;
                if (index >= 0) {
                    q = answeredQuestions[answeredIndex];
                }
                return q;
            }
        }
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
})();

var QuestionViewModel = function () {
    let self = this;
    self.question = ko.observable();
    self.answers = ko.observableArray();
    self.isAnswered = ko.observable(false);
    self.displayQuestion = function (question) {
        let q = question || QuestionManager.getInstance().getRandomQuestion();
        if (q) {
            self.question(q.question);
            self.answers(q.answers);
            self.isAnswered(q.isAnswered);
        }
    }
    self.answerQuestion = function (data, event) {
        if (data.correct) {
            event.target.classList.add("btn-success");
            event.target.innerHTML = "&#10004;";
        }
        else {
            event.target.classList.add("btn-danger");
            event.target.innerHTML = "&#10006;";
        }
        self.isAnswered(true);
        evaluateAnswer(self, data.correct);
    }
}

var Question = function (question, answers) {
    this.question = question;
    this.answers = answers;
    this.isAnswered = false;
}

var Answer = function (text, correct) {
    this.text = text;
    this.correct = correct || false;
}

function evaluateAnswer(question, correct) {
    let answerEvalNode = document.getElementById("answer-evaluation");
    if (correct) {
        answerEvalNode.firstChild.innerHTML = "Correct! Great job!";
    } else {
        for (let a of question.answers()) {
            if (a.correct) {
                answerEvalNode.firstChild.innerHTML = "Nope! The correct answer is \"" + a.text + "\"!";
            }
        }
    }
    answerEvalNode.classList.add("show");
}

function beginQuiz(e, qvm) {
    e.target.setAttribute("disabled", "");
    qvm.displayQuestion();
    document.getElementById("intro-container").classList.add("d-none");
    document.getElementById("quiz-container").classList.remove("d-none");
}

function nextQuestion(qvm) {
    let answerEvalNode = document.getElementById("answer-evaluation");
    answerEvalNode.classList.remove("show");
    qvm.displayQuestion();
    qvm.isAnswered(false);
}

function previousQuestion(qvm) {
    let answerEvalNode = document.getElementById("answer-evaluation");
    answerEvalNode.classList.remove("show");
    qvm.displayQuestion(QuestionManager.getInstance().getAnsweredQuestion());
    qvm.isAnswered(true);
}

// Run init() on load
document.addEventListener("DOMContentLoaded", function () {
    init();
});