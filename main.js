import { addComment, renderComments, getAll } from "./comment.js";
import { authorizationApi, getTodos } from './api.js'
import { renderMain } from "./renderMain.js";


// const buttonElement = document.getElementById("add-form-button-id");
// const commentListEl = document.getElementById("comments-id");
// const nameId = document.getElementById("add-form-name-id");
// const commentAdd = document.getElementById("add-form-text-id");
// const loaderFunc = document.getElementById("loader"); 
// const addForm = document.getElementById('add-form');
// const username = document.getElementById("auth-form-name-id");
// const password = document.getElementById("auth-form-password-id");

export let commentArr = [];
export const setNewComents = (newComments) => {
  commentArr = newComments
}

// nameId.disabled = true;
// commentAdd.disabled = true;
// buttonElement.disabled = true;

export let user = null
export const setUser = (newUser) => {
  user = newUser
}

//getAll(commentArr, nameId, commentListEl, buttonElement, commentAdd, loaderFunc)//

export function fetchAndRenderComents() {
   return getTodos().then((response) => {
    commentArr = response.comments
    renderComments();
  })
}

renderMain({container: document.querySelector(".app")})

// if (user.hasOwnProperty('token')) {
//   addForm.style.display = 'flex'
// }

//раскоментить потом
//buttonElement.addEventListener("click", () => addComment(nameId,commentAdd, commentArr, commentListEl, buttonElement, loaderFunc));