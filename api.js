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

export function authorizationApi(login, password) {
  console.log('auth');
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({login: login, password: password})
  }).then((res) => {
    if (res.status == 201) {
      return res.json();
    } else if (res.status == 400) {
      throw new Error('Неверный логин и/или пароль')
    }

    throw new Error('Ошибка сервера')
  })

  .catch(err => {
    alert(err);
  })
}

export function registrationApi(login, password, name) {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({login: login, password: password, name: name})
  }).then((res) => {
    if (res.status == 200) {
      return res.json;
    } else if (res.status === 400) {
      throw new Error('Пользователь уже существует')
    }

    throw new Error('Ошибка сервера')
  })
  .then(val =>{
    return {name: val.user.name, token: val.user.token}
  })
  .catch(err => {
    alert(err)
  })
}