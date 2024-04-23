export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/:andrey-stepanov/comments")
    .then((response) => response.json())
}

export function postTodos(body) {
    return fetch("https://wedev-api.sky.pro/api/v1/:andrey-stepanov/comments", {
    method: "POST",
    body: JSON.stringify({...body, forceError: true})
  })
}