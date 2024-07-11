import { fetchAndRenderComents } from "./main.js"
import { renderForm } from "./renderForm.js"

export const renderMain = ({container}) => {
    container.innerHTML = `<div class="container">
    <h1 class="loaderText" id="loader">идет загрузка комментариев</h1>
    <ul class="comments" id="comments-id"></ul>
    <div class="form"></div>
    </div>`
    fetchAndRenderComents().then(() => {
        renderForm({container: document.querySelector(".form")})
    })
}