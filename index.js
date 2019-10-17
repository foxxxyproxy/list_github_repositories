import { Backend } from "./backend.js";
import {
  startLoader,
  stopLoader,
  displayError,
  disableFields,
  enableFields
} from "./helpers.js";

const github_username_form = document.querySelector("#github-username");
const list = document.querySelector("#list");
const button = document.querySelector("#get-repos");
const form = document.querySelector("#repos-form");
const login_error = document.querySelector("#login-error");

const API = new Backend();
API.setBaseUrl("https://api.github.com/");

form.addEventListener("submit", event => {
  event.preventDefault();
  disableFields(github_username_form);
  displayError(login_error, "");
  startLoader(button);

  const user = github_username_form.value;

  if (!user) {
    displayError(login_error, "Input user name");
    stopLoader(button, "Get repositories");
    enableFields(github_username_form);
    return false;
  }

  API.get(`users/${user}/repos`)
    .then(data => {
      if (data.message) {
        displayError(login_error, data.message);
        return false;
      }

      let html = "";
      data.forEach(item => {
        html +=
          ("beforeend",
          `<li id="repo-item"><a href = "${item.html_url}" target = "_blank">
          <h2>${item.full_name}</h2> <p>${item.description}</p></a></li>`);
      });
      list.innerHTML = html;
    })
    .finally(() => {
      stopLoader(button, "Get repositories");
      enableFields(github_username_form);
    });
});
