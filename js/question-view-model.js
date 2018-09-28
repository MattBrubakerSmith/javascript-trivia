var QuestionViewModel = function() {
    let self = this;
    self.question = ko.observable();
    self.answers = ko.observableArray();
    self.isAnswered = ko.observable(false);
    self.answerQuestion = function(data, event) {
        if(data.correct) {
            event.target.classList.add("btn-success");
            event.target.innerHTML = "&#10004;";
        }
        else {
            event.target.classList.add("btn-danger");
            event.target.innerHTML = "&#10006;";
        }

        Quiz.answerQuestion(data);
        toggleAnswers(false);
    }
}

function toggleAnswers(active) {
    let answers = document.querySelectorAll(".answer-button");
    for(let a of answers) {
        if(active) {
            a.removeAttribute("disabled");
        } 
        else {
            a.setAttribute("disabled", "");
        }
    }
}