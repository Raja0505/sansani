const button = document.querySelector(".search-button");
const text = document.querySelector(".search-input");

button.addEventListener("click", () => {
  const query = text.value;
  if (!query) return;
  fetchNews(query);
});

const Apikey = "702919bfabd04794804e5f8fa4a75f9c";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${Apikey}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardcontainer = document.getElementById("cards-container");
  const tempcard = document.getElementById("template-news-card");

  cardcontainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardclone = tempcard.content.cloneNode(true);
    filldata(cardclone, article);
    cardcontainer.appendChild(cardclone);
  });
}
function filldata(cardclone, article) {
  const title = cardclone.getElementById("news-title");
  const description = cardclone.getElementById("news-description");
  const image = cardclone.getElementById("news-img");
  const source = cardclone.getElementById("news-source");

  title.innerHTML = article.title;
  description.innerHTML = article.description;
  image.src = article.urlToImage;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  source.innerHTML = `${article.source.name} : ${date}`;

  cardclone.firstElementChild.addEventListener("click", () => {
    window.open(article.url);
  });
}

function idfetch(id) {
  fetchNews(id);
}

const hamburger = document.querySelector(".hamburger");
const Menu = document.querySelector(".nav-links");
const navitems = document.querySelectorAll(".hover-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  Menu.classList.toggle("active");
});

navitems.addEventListener("click", () => {
  navitems.classList.remove("active");
});
