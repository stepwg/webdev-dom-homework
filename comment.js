import { postTodos, getTodos } from "./api.js";
import { commentArr, user } from "./main.js";

export function renderComments() {
    const app = document.querySelector(".comments")
    const commentHtml = commentArr
    .map((comment, index) => {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let date = new Date(comment.date).toLocaleString('ru-RU', options)
  
        return `<li class="comment">
          <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-like="${index}"></button>
            </div>
          </div>
        </li>`
      })
      .join("");
  
      
    //commentListEl.innerHTML = commentHtml;//
    
    app.innerHTML = commentHtml;
    initLikeListener(commentArr);
    const comment = document.querySelectorAll('.comment');
    const formElementText = document.getElementById('add-form-text-id');
  
    comment.forEach((el, index) => {
      el.addEventListener('click', () => {
        formElementText.value = `>${commentArr[index].text} \n${commentArr[index].author.name}`
      });
    });
  };

  const initLikeListener = (commentArr) => {
    const likeButtonList = document.querySelectorAll(".like-button")
    for (const likeButtonElement of likeButtonList) {
      likeButtonElement.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = likeButtonElement.dataset.like
        if (commentArr[index].isLiked) {
          commentArr[index].isLiked = false
          commentArr[index].likes -= 1
        } else {
          commentArr[index].isLiked = true
          commentArr[index].likes += 1
        }
        renderComments(commentArr);
      })
    }
  };

  export function addComment () {
    const buttonElement = document.getElementById("add-form-button-id");
    const commentListEl = document.getElementById("comments-id");
    const nameId = document.getElementById("add-form-name-id");
    const commentAdd = document.getElementById("add-form-text-id");
    const loaderFunc = document.getElementById("loader"); 
    nameId.classList.remove("error");
    commentAdd.classList.remove("error");
  
    if (user.name === "" || commentAdd.value === "" || !commentAdd.value.trim() || !user.name.trim()) {
      nameId.classList.add("error")
      commentAdd.classList.add("error")
      return;
    }
  
    buttonElement.disabled = true;
    buttonElement.textContent = "элемент добавляется...";
  
    const body = {
      name: nameId.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
  
      text: commentAdd.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
    }
  
  
    postTodos(body, user.token)
      .then((response) => {
        if (response.status === 500) {
          throw new Error("сервер сломался, попробуйте позже");
        }
        if (response.status === 400) {
          throw new Error("Имя и комментарий должны быть не короче 3 символов");
        }
        if (response.ok) {
          getAll(commentArr, nameId, commentListEl, buttonElement, commentAdd, loaderFunc);
        }
      })
      .then(() => {
        renderComments(commentArr, commentListEl)
      })
      .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Добавить";
        commentAdd.value = ""; 
        nameId.value = "";
      })
      .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Добавить";
        if (!navigator.onLine) { 
          alert("интернет не работает");
        }
        else {
          alert(error);
        }
      })}

      export function getAll(commentArr, nameId, commentListEl, buttonElement, commentAdd, loaderFunc) {
        getTodos()
          .then((data) => {
            commentArr.splice(0, commentArr.length);
            commentArr.push(...data.comments);
          })
          .then(() => {
            renderComments(commentArr, commentListEl);
            loaderFunc.style.display = "none";
            nameId.disabled = false;
            commentAdd.disabled = false;
            buttonElement.disabled = false;
          });
      }