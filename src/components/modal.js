//реализация открытия попапа по нажатию на кнопку

export function openPopup(popup) {
  popup.classList.add("popup_is-opened"); //открытие попапов
  //добавление обработчиков закрытия
  popup.addEventListener("mousedown", closeByClickOverlay);
  popup.addEventListener("click", closeByClickCross);
  document.addEventListener("keydown", closeByEscape);
}

//реализация закрытия попапа по нажатию на кнопку
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened"); //закрытие попапов
  //удаление обработчиков закрытия
  popup.removeEventListener("mousedown", closeByClickOverlay);
  popup.removeEventListener("click", closeByClickCross);
  document.removeEventListener("keydown", closeByEscape);
}

//реализация закрытия активного попапа
export function closeActivePopup() {
  const activePopup = document.querySelector(".popup_is-opened");
  const button = activePopup.querySelector(".popup__button");
  closePopup(activePopup);
  if (button) {
    button.textContent = 'Сохранить';
  }
}

//реализация закрытия активного попапа
export function processForm() {
  const activePopup = document.querySelector(".popup_is-opened");
  const button = activePopup.querySelector(".popup__button");
  button.textContent = 'Сохранение...';
}

//обработчик закрытия по escape
const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    closeActivePopup();
  }
};

//обработчик закрытия по клику в оверлей
const closeByClickOverlay = (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeActivePopup();
  }
};

//обработчик закрытия по клику в крестик
const closeByClickCross = (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    closeActivePopup();
  }
};
