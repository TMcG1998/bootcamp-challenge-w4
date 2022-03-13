// set the quiz time limit to 60 seconds
const start = 25;
var time = start;

var hiscore = [];

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
        // remove old HTML elements upon restart
        if(document.querySelector("#start") != null) {
            document.querySelector("#start").remove();
            document.querySelector("#heading").remove();
        }
        if(document.querySelector("#play-again") != null) {
            document.querySelector("#play-again").remove();
        }
        if(document.querySelector("#hiscore-div") != null) {
            document.querySelector("#hiscore-div").remove();
        }
        if(document.querySelector("#hiscore-list")) {
            document.querySelector("#hiscore-list").remove();
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
        
    // prevents a bug that targets our original starting HTML elements   
    } else if(targetE1 == document.getElementById("quiz") || targetE1 == document.getElementById("intro") || targetE1 == document.getElementById("heading")) {
        return false;
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

    var hiScoreDivE1 = document.createElement("div");
    hiScoreDivE1.setAttribute("id", "hiscore-div");

    var nameInputE1 = document.createElement("input");
    nameInputE1.placeholder = "Enter your name";
    nameInputE1.setAttribute("class", "hiscore");
    nameInputE1.setAttribute("name", "score-name");
    nameInputE1.setAttribute("id", "score-name-input");
    hiScoreDivE1.appendChild(nameInputE1);

    var submitScoreE1 = document.createElement("button");
    submitScoreE1.textContent = "Submit Score";
    submitScoreE1.setAttribute("class", "hiscore");
    submitScoreE1.setAttribute("id", "score-btn");
    hiScoreDivE1.appendChild(submitScoreE1);

    displayE1.appendChild(hiScoreDivE1);

    var againButton = document.createElement("button");
    againButton.textContent = "Play Again!";
    againButton.setAttribute("id", "play-again");
    displayE1.appendChild(againButton);

    document.getElementById("play-again").addEventListener("click", startGame);
    document.getElementById("score-btn").addEventListener("click", saveScore);
}

// save the score to hiscores
var saveScore = function() {
    var inputName = document.querySelector("input[name='score-name']").value;
    if(!inputName) {
        alert("You need to enter a name!");
        return false;
    } else {
        var player = {
            name: inputName,
            score: score
        }
    }

    sortScores(player);
    localSaveScores();
    showScores();
}

// keep the array in ascending order, so that highest scores are stored near 0 index
var sortScores = function(playerObj) {
    // if this is the first score, just add it
    if(hiscore.length < 1) {
        hiscore.push(playerObj);
    } else {
        for(var i = 0; i < hiscore.length; i++) {
            if(playerObj.score > hiscore[i].score) {
                hiscore.splice(i, 0, playerObj);
                return true;
            }
            if(i == hiscore.length - 1) {
                hiscore.push(playerObj);
                return true;
            }
        }
    }
}

var showScores = function() {
    // Clear Input/Button
    // Display top 5 Names and scores
    document.getElementById("score-name-input").remove();
    document.getElementById("score-btn").remove();
    
    questionE1.textContent = "High Scores";

    var hiscoreDisplayE1 = document.createElement("div");
    hiscoreDisplayE1.setAttribute("id", "hiscore-list");

    var counter = 0;
    while(counter < 10 && counter < hiscore.length) {

        var newScoreE1 = document.createElement("p");
        newScoreE1.className = "score-entry";
        newScoreE1.textContent = hiscore[counter].name + " : " + hiscore[counter].score;
        
        hiscoreDisplayE1.appendChild(newScoreE1);
        counter++;
    }
    quizE1.appendChild(hiscoreDisplayE1);
}

// Save current array to web storage
var localSaveScores = function() {
    localStorage.setItem("scores", JSON.stringify(hiscore));
}

// Load old data
var loadScores = function() {
    hiscore = localStorage.getItem("scores");

    if(!hiscore) {
        hiscore = [];
        return false;
    }

    hiscore = JSON.parse(hiscore);
}

loadScores();

// listen for button click to start the quiz!
document.getElementById("start").addEventListener("click", startGame);
quizE1.addEventListener("click", answerQuestion);