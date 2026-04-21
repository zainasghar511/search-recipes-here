const searchbtn = document.querySelector(".search")
const inputfiled = document.querySelector("input")
const container = document.querySelector(".main-container")
//1 Add button in function
searchbtn.addEventListener("click",(event)=>{
    
    const dishname = inputfiled.value;
    getrecipes(dishname);
    if(dishname==""){
        alert("Enter the Dish name")
    }
});
inputfiled.addEventListener("keypress",(event)=>{
    if(event.key==="Enter"){
        searchbtn.click();
    }

})
//2Make async Function 
async function getrecipes(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    displayRecipes(data.meals); 
}
//3Function for putting value
function displayRecipes(meals){
     container.innerHTML="",
meals.forEach(meal => {
    // 4.Please read the card
    const recipeCard = document.createElement("div"); 
    recipeCard.classList.add("inner-seaction");

    recipeCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p>Category: ${meal.strCategory}</p>
        <button class="view">View Details</button>
    `;

    // 5. Button logic
    const viewbutton = recipeCard.querySelector(".view");
    viewbutton.addEventListener("click", () => {
        alert(`Recipe Name: ${meal.strMeal}\nInstructions: ${meal.strInstructions}`);
    });

    // 6. Image logic 
    const recipeImage = recipeCard.querySelector("img");
    recipeImage.style.cursor = "pointer";
    recipeImage.addEventListener("click", () => {
        alert(`Recipe Name: ${meal.strMeal}\nInstructions: ${meal.strInstructions}`);
    });

    // 7. Append
    container.appendChild(recipeCard);
})}
// 8.Get on screen items
getrecipes("a")
