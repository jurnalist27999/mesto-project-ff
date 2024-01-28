//реализация открытия попапа по нажатию на кнопку

export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  return popup;
}

//реализация закрытия попапа по нажатию на кнопку
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");

  return popup;
}

//реализация закрытия попапа по нажатию на оверлей

export function closeOverlay(e) {
  if (e.target === e.currentTarget) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

//Если убрать константы полей формы из modal.js, то - nameInput, jobInput is not defined
//const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
//const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
//export function handleFormSubmit(evt) {
  //evt.preventDefault();
  // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  //const name = nameInput.value;
  //const job = jobInput.value;
  // Вставьте новые значения с помощью textContent
  /*document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = job;

  closeModal(document.querySelector(".popup_is-opened"));
}*/
