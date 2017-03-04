//GLOBAL---------------------------------------------
var timeRemaining = 0;
var questionObject;
var timer;
var rightAnswers = [];
var wrongAnswers = [];
var unanswered = [];
var remainingQuestions = [{
        q: "What name was Amazon originally incorporated as?",
        answer: ["Nile Books", "Cadabra", "Mekong", "Origami"],
        correct: "Cadabra"
    }, {
        q: "What is the diameter of Earth?",
        answer: ["8,000 miles", "13500 miles", "27000 miles", "5000 miles"],
        correct: "8,000 miles"
    }, {
        q: "When was the euro introduced as legal currency on the world market?",
        answer: ["1994", "1987", "2003", "1999"],
        correct: "1999"
    }, {
        q: "How many pieces of wood make up the average violin?",
        answer: ["35", "50", "25", "70"],
        correct: "70"
    }, {
        q: "Where was the fortune cookie first introduced?",
        answer: ["Japan", "South Korea", "China", "America"],
        correct: "America"
    }, 
];

//The Game---------------------------------------------
function incrementTimer() {
    timer = setTimeout(function() {
        $('#time-remaining').text(timeRemaining);
        if (timeRemaining <= 0) {
            //unanswered
            unanswered.push(questionObject);
            $("#unanswered").html(wrongAnswers.length);
            askQuestion();
        } else {
            timeRemaining = timeRemaining - 1;
            incrementTimer();
        }

    }, 1000);
}

function startTimer() {
    clearTimeout(timer);
    timeRemaining = 10; // in seconds
    incrementTimer();
}

function askQuestion() {
    if (remainingQuestions.length <= 0) {
        clearTimeout(timer);
        alert("This round of Trivial Trivia is complete. This page will now reload.");
        window.location.reload();
    } else {
        startTimer();
        $('#containerForChoiceOptions').html("");
        questionObject = remainingQuestions.pop();

        var choices = questionObject.answer;
        $('#asked-question').html(questionObject.q);
        for (var i = 0; i < choices.length; i++) {
            var choice = $('<div>');
            choice.text(choices[i]);
            choice.attr('id', "choice-" + i);
            choice.attr('index', i);
            $('#containerForChoiceOptions').append(choice);

            choice.click(function() {
                if (this.innerHTML === questionObject.correct) {
                    rightAnswers.push(questionObject);
                    $("#correct").html(rightAnswers.length)
                    askQuestion();
                } else {
                    wrongAnswers.push(questionObject);
                    $("#incorrect").html(wrongAnswers.length)
                    askQuestion();
                }
            });
        }
    }
}
askQuestion();
