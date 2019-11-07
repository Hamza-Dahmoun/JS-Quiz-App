//lets enable the Save button once the user enter a text in the input
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
username.addEventListener("keyup", () => {
    //this line of code will enable the Save button
    //it will give a value to the boolean property "disabled" that is the negation of the boolean value of "username.value"
    //which is coercion
    //so if username.value is undefined or null --> booleanOf(null or undefined) is false --> saveScoreBtn.disabled = !false = true
    //if username.value is undefined or null --> booleanOf(any text) is true --> saveScoreBtn.disabled = !true = false
    saveScoreBtn.disabled = !username.value;
});

//lets get most recent score from localStorage and display it in UI... this most recent score is related to the current player, we'll ask him to save it
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

//we will only save top 5 scores in local storage
const MAX_HIGH_SCORES = 5;

saveHighScore = e => {
    //this line of code will prevent the button from redirecting us to "/end.html?username="
    //which means it will prevent the button from acting like a submit button that will submit username
    e.preventDefault();

    //This function will run when user enter his name and click the button 'Save', it will save his name and his score in localStorage
    //but only if his score is among top 5 scores
    //Step1: get the array of highScores from localStorage
    //Step2: push the new score to the array highScores
    //Step3: sort the array from biggest score to smallest one
    //Step4: splice all elements from the array after index '5'
    //Step5: reStore the new array in localStorage

    //step1: getting the array of hish scores from the localStorage, it is stored as string, so we've to parse it to become an array
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];//(this means if it doesn't find an item 'highScores' in localStorage it will return an empty array [])
    


}


