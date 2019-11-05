const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));//this is gonna be an array converted from an HTML Colection

let currentQuestion = {};//will be used to display the question
let acceptingAnswers = false;//will be used to control when to consider the user click as an answer to prevent him from clicking an answer by mistake
let score = 0;
let questionCounter = 0;
let availableQuestions = [];//will contain remaining questions to show

let questions = [
    {//this is an object representing a question
        question: "Inside which HTML element do we put the Javascript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1 //this is a property that tells which answer is true
    },
    {//this is an object representing a question
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3 //this is a property that tells which answer is true
    },
    {//this is an object representing a question
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4 //this is a property that tells which answer is true
    }
]; //this is an array of objects

const correctBonus = 10;
const maxQeustions = 3;