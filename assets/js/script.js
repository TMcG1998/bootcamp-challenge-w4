// set the quiz time limit to 60 seconds
const start = 60;
var time = start;

var score = 0;
var multiplier = 1;

// store the quiz questions to be displayed
var questions = [
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: ''
    }, 
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: ''
    }
];

// store the counter
var counterE1 = document.getElementById('counter');
var multiplierE1 = document.getElementById('multiplier');

let countInterval;

// starts the timer when the button is clicked
function updateTimer() {
    if(!countInterval) { 
        countInterval = setInterval(timer, 1000);
        multiplierE1.textContent = multiplier + "x";
    }
} 

// keeps the timer ticking, and will stop at 0
function timer() {
    counterE1.textContent = time;
    time--;

    if(time < 0) {
        clearInterval(countInterval);
        countInterval = null;
    }
}

// listen for button click to start the quiz!
document.getElementById("start").addEventListener("click", updateTimer);