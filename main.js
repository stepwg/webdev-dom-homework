import { renderComments } from "./comment.js";
import { getTodos } from './api.js'
import { renderMain } from "./renderMain.js";

export let commentArr = [];

export const setNewComents = (newComments) => {
  commentArr = newComments
}

export let user = null

export const setUser = (newUser) => {
  user = newUser
}

export function fetchAndRenderComents() {
   return getTodos().then((response) => {
    commentArr = response.comments
    renderComments();
  })
}

export function addListenerForComment() {
  const comment = document.querySelectorAll('.comment');
  const formElementText = document.getElementById('add-form-text-id');

  comment.forEach((el, index) => {          
    el.addEventListener('click', () => {
      user ? formElementText.value = `>${commentArr[index].text} \n${commentArr[index].author.name}` : alert("вы не авторизованы")
    });
  });
}

renderMain({container: document.querySelector(".app")})
