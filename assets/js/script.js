// set the quiz time limit to 60 seconds
const start = 60;
var time = start;

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

let countInterval;

// starts the timer when the button is clicked
function updateTimer() {
    if(!countInterval) {
        countInterval = setInterval(timer, 1000);
    }
} 

// keeps the timer ticking, and will stop at 0
function timer() {
    counterE1.innerHTML = time;
    time--;

    if(time < 0) {
        clearInterval(countInterval);
        countInterval = null;
    }
}

// listen for button click to start the quiz!
document.getElementById("start").addEventListener("click", updateTimer);