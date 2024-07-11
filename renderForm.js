import { initAddCommentListener, initAuthListener } from "./listeners.js"
import { user } from "./main.js"

export function renderForm ({container}) {
    console.log(user)
    const authBtn = `<div><p>Чтобы добавить коментарий, <a class="login" href="#">авторизуйтесь</a></div>`
      const form = `<div class="add-form" id='add-form'>
      <input type="text" class="add-form-name" id="add-form-name-id" placeholder="Введите ваше имя" />
      <textarea type="textarea" class="add-form-text" id="add-form-text-id" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="add-form-button-id">Написать</button>
      </div>
      </div>`
    container.innerHTML = user ? form : authBtn
    user ? initAddCommentListener() : initAuthListener()
}

