const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));//this is gonna be an array converted from an HTML Colection
const questionCounterText = document.getElementById("questionCounterText");
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("scoreText");


let currentQuestion = {};//will be used to display the question
let acceptingAnswers = false;//will be used to control when to consider the user click as an answer to prevent him from clicking an answer by mistake
let score = 0;
let questionCounter = 0;
let availableQuestions = [];//will contain remaining questions to show

let questions = []; //this is an array of questions objects ... it will be feeded from questions.json using fetch() API
/*let questions =
[
    {
    question: "Inside which HTML element do we put the Javascript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
},
{
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
},
{
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
}
];*/

//fetch() will return a promess so we use .then() to get the response and use it 

//****************************** FETCH API FROM LOCAL FILE ******************************/
/*IMPORTANT:
since we are loading data from a local file, always use (mode: 'no-cors') in fetch("questions.json", { mode: 'no-cors' })
otherwise it won't permit loading data, it will throw cross origin error
N.B: browsers (i'm sure abt chrome) won't permit loading data from local json file, so in order to check if the code works
if the code works just open the file using Live Server or something similar
*/
/*
fetch("questions.json", { mode: 'no-cors' }).then(res => {
    //console.log(res);
    //lets return the response body in a json format to the next then()
    //'res' is the Response
    //'res.json()' is the Response Body
    return res.json();
}).then(loadedQuestions => {
    console.log(loadedQuestions);
    //lets assign the array of the question objects (json) we've got to the empty array 'questions'
    questions = loadedQuestions;
    //now, we've got the questions successfully, so lets start the game
    startGame();
}).catch(error => {
    //this code will be reached just in case an error happened, example: wrong path
    console.error(error);
});
*/
//****************************** END OF FETCH API FROM LOCAL FILE ******************************/

//GoTo https://opentdb.com/api_config.php and generate your link according to what category to difficulty to....
let questionsSourceURL= "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
fetch(questionsSourceURL).then(res => {
    //lets return the response body in a json format to the next then()
    //'res' is the Response
    //'res.json()' is the Response Body
    return res.json();
}).then(loadedQuestions => {
    //lets se the format of the array we've got by logging it just to see what to do to make it look like the data in 'questions.json'
    //console.log(loadedQuestions.results);
    //after logging 'loadedQuestions.results' to console we know its format
    //lets assign the array of the question objects (json) we've got to the empty array 'questions' but in the same format as in 'questions.js'    
    questions = convertArrayFormat(loadedQuestions.results);
    console.log(questions);
    //now, we've got the questions successfully, so lets start the game
    startGame();
}).catch(error => {
    //this code will be reached just in case an error happened, example: wrong path
    console.error(error);
});

function convertArrayFormat(arr){
    //this function takes the array of objects brought from open trivia database api and makes it the same format as the json data in the file 'questions.json'
    //the properties that we're going to use from the brought data are: 'question', 'incorrect_answers', 'correct_answer'
    let convertedArray = [];
    //console.log(arr);
    for(let i=0; i<arr.length; i++){
        let questionObject = {question: "", choice1: "", answer: 0};
        //1- lets fill the question text
        questionObject.question = arr[i].question;
        
        //2- lets fill the 'incorrect_answers' array items into 'choice1, choice2...' properties of questionObject
        for(let j=0; j<arr[i].incorrect_answers.length; j++){
            questionObject["choice" + (j+1)] = arr[i].incorrect_answers[j];
        }

        //3- lets fill 'correct_answer' into 'choiceX' too
        questionObject["choice" + (arr[i].incorrect_answers.length+1)] = arr[i].correct_answer;
        //(Note that in this way all correct answers are the last choice, this can be guessed by players, so we should change that by putting the correct answer in a random position)
        
        //4- lets change the position of the correct answer randomly and store its index in questionObject.answer
        //4-a- Choose a random number different than zero
        let randomOneToLength = Math.floor(Math.random()*(arr[i].incorrect_answers.length+1+1));
        //the first (+1) is because we added the correct answer in the end.. the second (+1) is just to include 'N' when choose random number between 0~N
        
        if(randomOneToLength == 0){
            randomOneToLength=1;
        }
        //4-b- assign the answer stored in (questionObject.choice'randomnumber') to the variable 'answer'
        let answer = questionObject["choice"+randomOneToLength];
        //console.log("old answer: " + answer);
        //4-c- store the correct answer (which is in last choice) into (questionObject.choice'randomnumber')
        questionObject["choice"+randomOneToLength]=questionObject["choice" + (arr[i].incorrect_answers.length+1).toString()];
        //console.log('correct answer: ' + questionObject["choice"+randomOneToLength]);
        //4-d- now store the value of the variable 'answer' into the last choice
        questionObject["choice" + (arr[i].incorrect_answers.length+1).toString()] = answer;

        //5- lets store the new position of the correct answer in 'questionObject.answer'
        questionObject.answer = randomOneToLength;

        //6- lets push questionObject to convertedArray
        convertedArray.push(questionObject);
    }
    return convertedArray;
}

const correctBonus = 10;
const maxQeustions = 3;


startGame = () => {
    //this functino re-initialize all variables needed for the game
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];//'availableQuestions' will become a full copy of 'questions' 
    getNewQuestion();
}

//this is an arrow syntax for js functions without parameters
getNewQuestion = () => {
    //this function displays a new question to the player and update all variables

    //first we have to check if there are no questions to show, or we already showed more questions than we planned
    if (availableQuestions.length == 0 || questionCounter >= maxQeustions) {
        //Before going to the end page, lets store this score in LocalStorage
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');//it will take the user to the end.html page
    }

    //increasing questions counter and display it in UI
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + maxQeustions;
    progressBarFull.style.width = (questionCounter / maxQeustions) * 100 + "%";


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

//this is an arrow syntax for js functions with one parameter
increaseScore_inUI = num => {
    score += num;
    scoreText.innerText = score;
    console.log("hello");
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
            increaseScore_inUI(correctBonus);
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



//startGame();