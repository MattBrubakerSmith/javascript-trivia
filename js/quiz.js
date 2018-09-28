const Quiz = (function() {
    let quiz;

    function createQuiz() {
        var Question = function(question, answers) {
            this.question = question;
            this.answers= answers;
            this.isAnswered = false;
        }
        
        var Answer = function(text, correct) {
            this.text = text;
            this.correct = correct || false;
        }

        let questions = [
            new Question("What is a function?", [
                new Answer("A set of statements that performs a task or calculates a value.", true),
                new Answer("Do you mean the bodily kind?"),
                new Answer("The thing that conjunction junction has."),
                new Answer("A funky munchkin.")
            ]),
            new Question("What is a method?", [
                new Answer("Methhead, poorly enunciated."), 
                new Answer("A means to an end."), 
                new Answer("A function that is associated with an object.", true), 
                new Answer("All of the above.")
            ]),
            new Question("Which of the following is the correct syntax for declaring a variable and assigning it a value?", [
                new Answer("myVariable = \"variable\";"), 
                new Answer("var myVariable = \"variable\";", true), 
                new Answer("I hereby declare myVariable \"variable\""), 
                new Answer("VARIABLE!")
            ]),
            new Question("How can you include inline JavaScript in HTML?", [
                new Answer("You can't!"), 
                new Answer("mySite.javascript = ...place code here..."), 
                new Answer("HTML.include(...place code here...)"), 
                new Answer("<script>...place code here...</script>", true)
            ]),
            new Question("How long did it take to create the first version of JavaScript?", [
                new Answer("10 days", true), 
                new Answer("80 years"), 
                new Answer("4 months"), 
                new Answer("It's not done yet!")
            ]),
            new Question("Which of the following is NOT a JavaScript data type?", [
                new Answer("Null"), 
                new Answer("Data", true), 
                new Answer("Number"), 
                new Answer("String")
            ]),
            new Question("What is \"vanilla\" JavaScript?", [
                new Answer("Plain JavaScript that does not include any third-party libraries or frameworks.", true), 
                new Answer("The favorite ice cream treat of Silicon Valley!"), 
                new Answer("Boring JavaScript."), 
                new Answer("A JavaScript library.")
            ]),
            new Question("Which of the following is the correct syntax for declaring a function?", [
                new Answer("function myFunction = ...code..."), 
                new Answer("myFunction{...code...}"), 
                new Answer("function myFunction(...args...) {...code...}", true), 
                new Answer("JavaScript only has methods!")
            ]),
            new Question("Which of the following loops will iterate 10 times?", [
                new Answer("for(var i = 0; i <= 9; i++) {...code...}", true), 
                new Answer("for(iterate = 10) {...code...}"), 
                new Answer("while(true) {...code...}"), 
                new Answer("for(ten times) {...code...}")
            ]),
            new Question("Which of the following is NOT a way to access an HTML element or collection of elements?", [
                new Answer("document.getElementById(\"my-element\");"), 
                new Answer("document.getElementByClassName(\"my-element\");"), 
                new Answer("document.querySelector(\"#my-element\")"), 
                new Answer("var el = HTML(\"myElement\");", true)
            ])
        ];

        questions = randomizeArrayOrder(questions);
        let currentIndex = 0;
        let answerEvalNode = document.getElementById("answer-evaluation");
        let questionTally = 0;
        let correctAnswerCount = 0;

        return {
            displayQuestion: function(index) {
                if(questionTally < 10) {
                    currentIndex = index || currentIndex;
                    questionViewModel.question(questions[currentIndex].question);
                    questionViewModel.answers(questions[currentIndex].answers);
                    questionViewModel.isAnswered(questions[currentIndex].isAnswered);
                    answerEvalNode.innerHTML = "";
                }
                else {
                    completeQuiz(correctAnswerCount);
                }
            },
            answerQuestion: function(data) {
                questions[currentIndex].isAnswered = true;
                answerEvalNode.innerHTML = data.correct ? "Correct! Great job!" : "WRONG!";
                questionTally++;
                if(data.correct) correctAnswerCount++;
            },
            getQuestionIndex: function() {
                return currentIndex;
            }
        }
    }

    function getQuiz() {
        if(!quiz) {
            quiz = createQuiz();
        }
        return quiz;
    }

    return getQuiz();
})();

function randomizeArrayOrder(array) {
    let index = array.length; 
    let temp; 
    let randomIndex;

    while (index !== 0) {
        randomIndex = Math.floor(Math.random() * index);
        index -= 1;
    
        temp = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
}