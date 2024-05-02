import { addComment, renderComments, getAll } from "./comment.js";

const buttonElement = document.getElementById("add-form-button-id");
const commentListEl = document.getElementById("comments-id");
const nameId = document.getElementById("add-form-name-id");
const commentAdd = document.getElementById("add-form-text-id");
const loaderFunc = document.getElementById("loader"); 
const commentArr = [];

nameId.disabled = true;
commentAdd.disabled = true;
buttonElement.disabled = true;


getAll(commentArr, nameId, commentListEl, buttonElement, commentAdd, loaderFunc)

renderComments(commentArr, commentListEl);

buttonElement.addEventListener("click", () => addComment(nameId,commentAdd, commentArr, commentListEl, buttonElement, loaderFunc));