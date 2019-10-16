import { Backend } from "./backend.js";
import { startLoader, stopLoader } from "./helpers.js";

const github_username = document.querySelector("#github-username");
const list = document.querySelector("#list");
const button = document.querySelector("#get-repos");
const API = new Backend();
API.setBaseUrl("https://api.github.com/");

const form = document.querySelector("#repos-form");
form.addEventListener("submit", event => {
  event.preventDefault();
  startLoader(button);
  if (!github_username.value) {
    return false;
  }
  console.log(github_username.value);
  const user = github_username.value;

  API.get(`users/${user}/repos`)
    .then(data => {
      let html = "";
      data.forEach(item => {
        html +=
          ("beforeend",
          `<li id="repo-item"><a href = "${item.html_url}" target = "_blank"><h2>${item.full_name}</h2> <p>${item.description}</p></a></li>`);
      });
      list.innerHTML = html;
    })
    .finally(() => {
      stopLoader(button, "Get repositories");
    });
});
