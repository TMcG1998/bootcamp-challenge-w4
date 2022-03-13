// set the quiz time limit to 60 seconds
const start = 25;
var time = start;

var score = 0;
var multiplier = 1;
var problem = 0;

// store the quiz questions to be displayed
var questions = [
    {
        question: "The action of doing something over and over again",
        choice1: "variable",
        choice2: "conditional",
        choice3: "loop",
        choice4: "function",
        answer: "loop"
    }, 
    {
        question: "Something occurs and the DOM stores it's data",
        choice1: "event",
        choice2: "console",
        choice3: "interaction",
        choice4: "algorithm",
        answer: "event"
    },
    {
        question: "Statements that only run under certain conditions",
        choice1: "variable",
        choice2: "boolean",
        choice3: "string",
        choice4: "conditional",
        answer: "conditional"
    },
    {
        question: "Finding and fixing a problem in an algorithm or program",
        choice1: "styling",
        choice2: "looping",
        choice3: "debugging",
        choice4: "giving up",
        answer: "debugging"
    },
    {
        question: "A piece of code that can be called over and over",
        choice1: "HTML",
        choice2: "CSS",
        choice3: "iteration",
        choice4: "function",
        answer: "function"
    }
];

// store values we'll need later
var counterE1 = document.getElementById("counter");
var multiplierE1 = document.getElementById("multiplier");
var quizE1 = document.querySelector("#quiz");
var displayE1 = document.querySelector("#display");
var questionE1 = document.querySelector("#intro");

let countInterval;

// starts the timer when the button is clicked
var startGame = function() {
    time = start;
    score = 0;
    multiplier = 1;
    problem = 0;

    if(!countInterval) { 
        // start timer
        countInterval = setInterval(timer, 1000);
        // display multiplier and timer
        multiplierE1.textContent = multiplier + "x";
        counterE1.textContent = time;
        // remove the start button and large welcome header upon starting
        if(document.querySelector("#start") != null) {
            document.querySelector("#start").remove();
            document.querySelector("#heading").remove();
        }
        if(document.querySelector("#play-again") != null) {
            document.querySelector("#play-again").remove();
        }
        displayButtons();
        displayQuestion();
    }
} 

// keeps the timer ticking, and will stop at 0
var timer = function() {
    counterE1.textContent = time;
    time--;

    if(time < 0) {
        endGame();
    }
}

// One-time function to create and display answer buttons
var displayButtons = function() {
    for (var i = 1; i < 5; i++) {
        var buttonChoiceE1 = document.createElement("button");
        buttonChoiceE1.setAttribute("id", i);
        buttonChoiceE1.className = "choices-btn";
        quizE1.appendChild(buttonChoiceE1);
    }
}

// display the current question
var displayQuestion = function() {
    if(problem < questions.length) {
        // access our current problem object and save it
        var currentProb = questions[problem];
        // display the question
        questionE1.textContent = currentProb.question;
        // update buttons to reflect choices
        document.getElementById("1").textContent = currentProb.choice1;
        document.getElementById("2").textContent = currentProb.choice2;
        document.getElementById("3").textContent = currentProb.choice3;
        document.getElementById("4").textContent = currentProb.choice4;
    // if we're out of questions the game is over!
    } else {
        endGame();
    }
}

// determines if your answer is correct, then updates to the next question
var answerQuestion = function(event) {
    var targetE1 = event.target;
    var tarText = targetE1.textContent;
    var currentAnswer = questions[problem].answer;
    // prevents a bug 
    if(tarText == "Start!") {
        
    } 
     else if(tarText == currentAnswer) {
        score += (1 * multiplier);
        multiplier++;
        problem++;
    } else {
        multiplier = 1;  
        time -= 10;
        problem++;
    }
    
    updateMultiplier();
    displayQuestion();
}

// update the multiplier
var updateMultiplier = function() {
    multiplierE1.textContent = multiplier + "x";
}

// displays scores and offers to play again
var endGame = function() {
    clearInterval(countInterval);
    countInterval = null;

    document.getElementById("1").remove();
    document.getElementById("2").remove();
    document.getElementById("3").remove();
    document.getElementById("4").remove();
    
    counterE1.textContent = "";
    multiplierE1.textContent = "";

    questionE1.textContent = "Your score was: " + score;

    var againButton = document.createElement("button");
    againButton.textContent = "Play Again!";
    againButton.setAttribute("id", "play-again");
    displayE1.appendChild(againButton);
    document.getElementById("play-again").addEventListener("click", startGame);
}

// listen for button click to start the quiz!
document.getElementById("start").addEventListener("click", startGame);
quizE1.addEventListener("click", answerQuestion);