//lets enable the Save button once the user enter a text in the input
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
username.addEventListener("keyup", () =>{
    //this line of code will enable the Save button
    //it will give a value to the boolean property "disabled" that is the negation of the boolean value of "username.value"
    //which is coercion
    //so if username.value is undefined or null --> booleanOf(null or undefined) is false --> saveScoreBtn.disabled = !false = true
    //if username.value is undefined or null --> booleanOf(any text) is true --> saveScoreBtn.disabled = !true = false
    saveScoreBtn.disabled = !username.value;
});

//lets get most recent score from localStorage and display it in UI
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;


saveHighScore = e =>{
    //this line of code will prevent the button from redirecting us to "/end.html?username="
    //which means it will prevent the button from acting like a submit button that will submit username
    e.preventDefault();
}


