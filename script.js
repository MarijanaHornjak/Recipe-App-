const search = document.querySelector("form");
const searchResult = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const id = "36e8e23e";
const key = "1095c5c589461489611d43a977311c4a";
const presentation = document.querySelector(".presentation");

//Event Listeners
search.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  // console.log(searchQuery);

  fetchApi();
});

//Fetching the recipes
async function fetchApi() {
  const url = ` https://api.edamam.com/search?q=${searchQuery}&app_id=${id}&app_key=${key}&to=20`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  generateHTML(data.hits);
}

//Generating the html

function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `<div class="item">
    <img
      src="${result.recipe.image}"
      alt="${result.recipe.label}"
    />
    <div class="flex-container">
      <h1 class="title">${result.recipe.label}</h1>
      <button class="recipe-button"><a class="view-recipe" href="${
        result.recipe.url
      }" target="_blank">View Recipe</a>
      </button>
    </div>
    <p class="item-data"><strong>Calories</strong>: ${result.recipe.calories.toFixed(
      2
    )}</p>
    <p class="item-data"><strong>Ingredients</strong>: ${
      result.recipe.ingredientLines
    }</p>
  </div>`;
  });
  searchResult.innerHTML = generatedHTML;
  presentation.style.display = "none";
}
