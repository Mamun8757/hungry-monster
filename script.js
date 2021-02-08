const search = document.getElementById('search');
search.addEventListener('click', function () {
    const foodName = document.getElementById('searchFood').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
      .then(response => response.json())
      .then(data => {
          document.getElementById('meals').innerHTML = "";
          document.getElementById('displayingFood').innerHTML = ' ';
          const meals = document.getElementById('meals');
          data.meals.forEach(element => {
            const food = document.createElement('div')
            food.innerHTML = `
            <img src = "${element.strMealThumb}" onClick="handlefoodClick(${element.idMeal})">
            <h1 onClick = "handlefoodClick(${element.idMeal})" >${element.strMeal}</h1>
            `;
            food.className = "card";
            meals.appendChild(food);
          });
      })
      .catch(error => {
        console.log(error);
        document.getElementById('meals').innerHTML = "";
        document.getElementById('displayingFood').innerHTML = ' ';
        const meals = document.getElementById('meals');
        const notFound = document.createElement('h1')
        notFound.innerHTML = `Sorry didn't match any items!`;
        meals.appendChild(notFound);
      })
})

let handlefoodClick = foodId => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
    .then(response => response.json())
    .then(data => {
      let foodData = document.getElementById('displayingFood');
      document.getElementById('displayingFood').innerHTML = ' ';
      document.getElementById('displayingFood').style.display = 'block';
      let foodInfo = document.createElement('div')
      foodInfo.innerHTML = `
      <img src="${ data.meals[0].strMealThumb }">
      <h1>${ data.meals[0].strMeal }</h1>
      <br>
      <h1>Category: ${ data.meals[0].strCategory }</h1>
      <br>
      <h3> <li>${ data.meals[0].strIngredient1 }</li> </h3>
      <h3> <li>${ data.meals[0].strIngredient2 }</li> </h3>
      <h3> <li>${ data.meals[0].strIngredient3 }</li> </h3>
      <h3> <li>${ data.meals[0].strIngredient4 }</li> </h3>
      <h3> <li>${ data.meals[0].strIngredient5 }</li> </h3>
      <h3> <li>${ data.meals[0].strIngredient6 }</li> </h3>
      `;
      foodInfo.className = "food-info";
      foodData.appendChild(foodInfo);
    })
}
