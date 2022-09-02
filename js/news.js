// fetching categories
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
// fetching News By Category
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
// loading news by categories in the first loading page
(() => {
    loadingNewsByCategory("01");
})();

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

    const singleNewsCardElement = document.getElementById(
        "single-news-card-id"
    );
    singleNewsCardElement.innerHTML = "";

    newsByCategories.forEach((singleNews) => {
        const createSingleNewsCardElement = document.createElement("div");
        createSingleNewsCardElement.classList.add(
            "single-news-card",
            "bg-white",
            "mb-4"
        );
        console.log(singleNews);
        createSingleNewsCardElement.innerHTML = `
            <div class="row">
                <div class="col-md-3">
                    <div class="image-thumbnail-news p-4">
                        <img
                            class="img-fluid w-100"
                            src="${singleNews.thumbnail_url}"
                            alt=""
                        />
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="single-news-info pe-5">
                        <h2>
                           ${singleNews.title}
                        </h2>
                        <p class="my-4">
                            ${singleNews.details.slice(0, 450)} ...
                        </p>

                        <div
                            class="footer-news d-flex justify-content-between align-items-center"
                        >
                            <div
                                class="author-info d-flex align-items-center"
                            >
                                <div class="author-avatar">
                                    <img
                                        src="${singleNews.author.img}"
                                        alt=""
                                    />
                                </div>
                                <div class="author-profile ms-2">
                                    <h3>${
                                        singleNews.author.name
                                            ? singleNews.author.name
                                            : "Not Found"
                                    }</h3>
                                    <p>${singleNews.author.published_date}</p>
                                </div>
                            </div>
                            <div class="total-view">
                                <i class="fa-regular fa-eye"></i>
                                <span class="ms-1">${
                                    singleNews.total_view
                                }</span>
                            </div>

                            <div class="news-reader-rating">
                                <p>
                                    Rating:<span class="ms-1">${
                                        singleNews.rating.number
                                    }</span>
                                </p>
                            </div>

                            <div class="news-details-modal">
                                <i  
                                    onclick="loadingNewsDetailsByNewsId('${
                                        singleNews._id
                                    }')"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    class="fa-solid fa-arrow-right"
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        `;
        singleNewsCardElement.appendChild(createSingleNewsCardElement);
    });
};

// fetching News Details By NewsId
const loadingNewsDetailsByNewsId = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayNewsDetailsByNewsId(data.data[0]))
        .catch((error) => {
            console.log(error.message);
        });
};

const displayNewsDetailsByNewsId = (newsDetails) => {
    const newsTitleElem = document.getElementById("newsTitleId");
    const newsThumbnailElem = document.getElementById("news-thumbnail-id");
    const newsDetailElem = document.getElementById("newsDetailId");
    const authorAvatarElem = document.getElementById("authorAvatarId");
    const authorNameElem = document.getElementById("authorNameId");
    const publishedDateElem = document.getElementById("publishedDateId");
    const viewTotalElem = document.getElementById("viewTotalId");
    const ratingElem = document.getElementById("ratingId");
    const isTodayPickUpElem = document.getElementById("isTodayPickUpId");
    const isTrendingElem = document.getElementById("isTrendingId");

    newsThumbnailElem.setAttribute("src", `${newsDetails.thumbnail_url}`);
    newsThumbnailElem.setAttribute("alt", `${newsDetails.title}`);
    newsTitleElem.innerText = newsDetails.title;
    newsDetailElem.innerText = newsDetails.details;
    authorAvatarElem.setAttribute("src", `${newsDetails.author.img}`);
    authorAvatarElem.setAttribute("alt", `${newsDetails.author.name}`);
    authorNameElem.innerText = newsDetails.author.name
        ? newsDetails.author.name
        : "Not Provided";
    publishedDateElem.innerText = newsDetails.author.published_date
        ? newsDetails.author.published_date
        : "Not Date";
    viewTotalElem.innerText = newsDetails.total_view;
    ratingElem.innerText = newsDetails.rating.number;
    isTodayPickUpElem.innerText = newsDetails.others_info.is_todays_pick;
    isTrendingElem.innerText = newsDetails.others_info.is_trending;
};

loadCategories();
