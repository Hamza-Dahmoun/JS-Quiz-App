const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];//so if the array didn't exist in localStorage we'll create an empty array
highScoresList.innerHTML = highScores.map( oneScoreObject => {
    return "<li class='high-score'>" + oneScoreObject.name + " - " + oneScoreObject.score + "</li>";
}
).join("");
//EXPLANATION OF THE ABOVE FUNCTION
//1- The list innerHTML is going to be assigned a string .. next point explains the string source
//2- The string is composed of many items of an array that are going to be joined using the func .join("") ... the source of the aray is explained in next point
//3- The array that we joined its items is returned by the function highScores.map()
//4- The function highScores.map() contains a function that will concatenate the values of the properties 'score' and 'name' of
//each object (knowing that each item of the array highScores is an object {name:'value', score:'value'}) into a string
//that represents an 'li' tag

//So, what we've done is:
//foreach item (object) of the array highScores,
//we took the name and the score stored in it,
//and put them in a string that represents an li tag <li class="high-score"></li>,
//and push the each new string into a new array and return this new array using .map() function,
//then, the items of the new array (which are strings) will be joined to each other using .join("") function,
//which will give us a string like:
//<li class="high-score">james - 20</li><li class="high-score">jess - 10</li><li class="high-score">somebody - 0</li>
//in the end, the string resulted in the above line will be assigned to highScores.innerHTML so that it appears in the UI
