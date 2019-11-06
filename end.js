saveHighScore = e =>{
    //this line of code will prevent the button from redirecting us to "/end.html?username="
    //which means it will prevent the button from acting like a submit button that will submit username
    e.preventDefault();
}