// fetching the meal api from the TheMealDB API
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCategories(data.data.news_category))
        .catch((error) => {
            console.log(error.message);
        });
};

const displayCategories = (categories) => {
    console.log(categories);
    const newsCategoriesElement = document.getElementById("newsCategoriesId");

    categories.forEach((category) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<button onclick="loadingNewsByCategory('${category.category_id}')">${category.category_name}</button>`;
        newsCategoriesElement.appendChild(listItem);
    });
};

const loadingNewsByCategory = (categoryId) => {
    console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayNewsByCategory(data.data))
        .catch((error) => {
            console.log(error.message);
        });
};

const displayNewsByCategory = (newsByCategories) => {
    console.log(newsByCategories);
    const lengthNewsByCategoriesElement = document.getElementById(
        "lengthNewsByCategoriesElement"
    );
    lengthNewsByCategoriesElement.innerHTML = "";

    if (newsByCategories.length === 0) {
        const headingElement = document.createElement("h2");
        headingElement.innerText = `No News items found for category`;
        lengthNewsByCategoriesElement.appendChild(headingElement);
    } else {
        const headingElement = document.createElement("h2");
        headingElement.innerText = `${newsByCategories.length} News items found for category`;
        lengthNewsByCategoriesElement.appendChild(headingElement);
    }
};

loadCategories();
