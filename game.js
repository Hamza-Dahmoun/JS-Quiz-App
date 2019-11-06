const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));//this is gonna be an array converted from an HTML Colection
const questionCounterText = document.getElementById("questionCounterText");



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


startGame = () => {
    //this functino re-initialize all variables needed for the game
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];//'availableQuestions' will become a full copy of 'questions' 
    getNewQuestion();
}

getNewQuestion = () => {
    //this function displays a new question to the player and update all variables

    //first we have to check if there are no questions to show, or we already showed more questions than we planned
    if (availableQuestions.length == 0 || questionCounter >= maxQeustions) {
        //go to the end page
        return window.location.assign('/end.html');//it will take the user to the end.html page
    }

    //increasing questions counter and display it in UI
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + maxQeustions;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);//we knoow that availableQuestions.length=3 so questionIndex is going to randomly be one of {1, 2, 3}  
    currentQuestion = availableQuestions[questionIndex];//updating 'currentQuestion' object using the random index 'questionIndex'
    question.innerText = currentQuestion.question;//displaying the question text in UI from the currentQuestion object

    //we have written the question text in the UI, lets now write all the choices of this question into the UI
    choices.forEach(choice => {
        //we will first get the choices text of this question using the dataset which contain the custom property 'number' that we've added in the HTML tags
        //Lets get the custom property 'number' value
        const number = choice.dataset["number"];

        //This get the choice text using the custom property 'number' value: currentQuestion['choice' + number]
        //(becuz it will be like currentQuestion[choice1], or currentQuestion[choice2], currentQuestion[choice3])

        //Now lets write the choice text to the UI from the 'currentQuestion' object
        choice.innerText = currentQuestion["choice" + number];
    }
    );

    //Now lets remove the current question from the availableQuestion array
    availableQuestions.splice(questionIndex, 1);
    //Syntax: array.splice(indexOfElementWhereToStartToRemove, HowManyElementsToRemove);

    //Lets now make user's clicks countable as answers
    acceptingAnswers = true;
};


//Adding Clicks event to the answers, when user select an answer we'll check if his answer is correct
//and then display him the next question
choices.forEach(choice => {
    //in each click function of answers, the event.target is a parameter
    choice.addEventListener("click", e => {
        //lets first check if we're accepting answers or not
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //lets now check the correctness of the answer and colorize it accordingly
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        //lets now colorize the answer with the classToApply
        selectedChoice.parentElement.classList.add(classToApply);

        //Now lets wait for one second so that the user see whether his answer is correct (freen) or incorrect (red)
        //and then move to next question
        setTimeout(() => {
            //before moving to next question, lets remove the colorization that we've added to the selected answer
            selectedChoice.parentElement.classList.remove(classToApply);
            //lets move to a new question
            getNewQuestion();
        }, 1000);


    });
});



startGame();