import { authorizationApi } from './api.js'
import { setUser } from './main.js';
import { renderMain } from './renderMain.js';



export const renderLogin = ({container}) => {
  container.innerHTML = `<div class="container">
      <div class="auth-form comment">
      <h1 class="formNaming">Форма входа</h1>
      <div class="inputs-box">
        <input type="text" class="add-form-name" id="auth-form-name-id" placeholder="Введите логин"/>
        <input type="password" class="add-form-name" id="auth-form-password-id" placeholder="Введите пароль" />
      </div>
        <div class="add-form-row">
          <button type="button" class="add-form-button" id="auth-button-id">Войти</button>
        </div>

      </div>
      </div>`
  const addForm = document.getElementById('add-form');
  const authButton = document.getElementById('auth-button-id');
  const username = document.getElementById("auth-form-name-id");
  const password = document.getElementById("auth-form-password-id");

  authButton.addEventListener("click", () => {
    authorizationApi(username.value, password.value)
    .then(response => {
      console.log(response)
      setUser(response.user)
      renderMain({container})
    })

  });
}