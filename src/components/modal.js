//реализация открытия попапа по нажатию на кнопку

export function openPopup(popup) {
  popup.classList.add("popup_is-opened"); //открытие попапов

  popup.classList.add("popup_is-animated");

  document.addEventListener("keydown", closeByEscape);
};

//реализация закрытия попапа по нажатию на кнопку
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened"); //закрытие попапов
  document.removeEventListener("keydown", closeByEscape);
};

export const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openPopupEsc = document.querySelector(".popup_is-opened");
    closePopup(openPopupEsc);
  }
};
