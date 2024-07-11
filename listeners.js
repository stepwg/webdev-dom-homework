import { addComment } from "./comment.js";
import { renderLogin } from "./login.js"

export function initAuthListener() {
    const authLink = document.querySelector(".login")
    authLink.addEventListener('click', () => {
        renderLogin({container: document.querySelector(".app")})
    })
}

export function initAddCommentListener() {
    const buttonElement = document.getElementById("add-form-button-id");
    buttonElement.addEventListener("click", addComment)
}