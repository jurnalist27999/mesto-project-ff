const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
  headers: {
    authorization: '51433ba5-28a3-4ceb-829b-e73fa9eb1365',
    'Content-Type': 'application/json'
  }
};

function api({ url, method, body }) {
  // параметры fetch запроса
  const params = {
    headers: config.headers,
    method,
  };

  if (body) {
    // если передано body превращаем его в JSON
    params.body = JSON.stringify(body);
  }

  return fetch(`${config.baseUrl}/${url}`, params)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
}

// 3. Загрузка информации о пользователе с сервера
//GET https://nomoreparties.co/v1/:cohortId/users/me
export function getProfile() {
  return api({ url: 'users/me' });
}

// 4. Загрузка карточек с сервера
// GET https://nomoreparties.co/v1/cohortId/cards
export function getInitialCards() {
  return api({ url: 'cards' });
}

// 5. Редактирование профиля
// PATCH https://nomoreparties.co/v1/cohortId/users/me
export function updateProfileInfo(name, about) {
  return api({ url: 'users/me', method: 'PATCH', body: { name, about } });
}

// 6. Добавление новой карточки
// POST https://nomoreparties.co/v1/cohortId/cards
export function addCard(name, link) {
  return api({ url: 'cards', method: 'POST', body: { name, link } });
}

// 8. Удаление карточки
// DELETE https://nomoreparties.co/v1/cohortId/cards/cardId
export function deleteCardApi(cardId) {
  return api({ url: `cards/${cardId}`, method: 'DELETE' });
}

// 9. Постановка лайка
// PUT https://nomoreparties.co/v1/cohortId/cards/likes/cardId
export function likeCardApi(cardId) {
  return api({ url: `cards/likes/${cardId}`, method: 'PUT' });
}

// 9. Снятие лайка
// DELETE https://nomoreparties.co/v1/cohortId/cards/likes/cardId
export function unlikeCardApi(cardId) {
  return api({ url: `cards/likes/${cardId}`, method: 'DELETE' });
}

// 10. Обновление аватара пользователя
// PATCH https://nomoreparties.co/v1/cohortId/users/me/avatar
export function updateProfileAvatar(avatar) {
  return api({ url: `users/me/avatar`, method: 'PATCH', body: { avatar } });
}
