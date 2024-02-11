


import "./pages/index.css";
import { initialCards } from "./cards.js";
import { openPopup, closePopup} from "./components/modal.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
const placesList = document.querySelector(".places__list");
const formEdit = document.querySelector(".popup_type_edit"); // попап редактирования
const formCard = document.querySelector(".popup_type_new-card"); // попап карточки
const popupTypeImage = document.querySelector(".popup_type_image"); //нашли попап изображения
const profileEditbutton = document.querySelector(".profile__edit-button"); // кнопка открытия редактирования
const profileAddbutton = document.querySelector(".profile__add-button"); // кнопка открытия карточки
// Находим форму в DOM
const formElement = document.querySelector('[name="edit-profile"]'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
//попап добавления карточки
const formElementCard = document.querySelector('[name="new-place"]');
//поля форм
const formNewPlace = formCard.querySelector(".popup__form");
const nameInputCard = formNewPlace.querySelector(
  ".popup__input_type_card-name"
);
const urlInputCard = formNewPlace.querySelector(".popup__inpnut_type_url");

const popupImageNew = popupTypeImage.querySelector(".popup__image"); //нашли изображение
const popupCaption = popupTypeImage.querySelector(".popup__caption"); //нашли название изображения

const nameTitle = document.querySelector(".profile__title"); //нужно для отображения текущих данных со страницы в полях формы
const jobDescription = document.querySelector(".profile__description"); //нужно для отображения текущих данных со страницы в полях формы

const popups = document.querySelectorAll(".popup"); //общий попап

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, likeCard, openPopupImage);
  placesList.append(card);
});

profileEditbutton.addEventListener("click", function () {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobDescription.textContent;
  return openPopup(formEdit);
});

profileAddbutton.addEventListener("click", function () {
  return openPopup(formCard);
});

function openPopupImage(element) {
  popupImageNew.src = element.link; //ссылка на изображение
  popupImageNew.alt = element.alt;
  popupCaption.textContent = element.name; //ссылка на название изображения

  openPopup(popupTypeImage); //открытие попапа с изображением
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//обработчик отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = nameInput.value;
  const job = jobInput.value;
  nameTitle.textContent = name; // Вставьте новые значения с помощью textContent
  jobDescription.textContent = job;

  closePopup(document.querySelector(".popup_is-opened"));
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//обработчик отправки формы
function sendingFormSubmit(evt) {
  evt.preventDefault();
  const cardNew = {
    name: nameInputCard.value,
    link: urlInputCard.value,
  };

  const cardNewData = createCard(cardNew, deleteCard, likeCard, openPopupImage);

  placesList.prepend(cardNewData); //добавляем новую карточку в начало контейнера

  closePopup(document.querySelector(".popup_is-opened"));
  formElementCard.reset(); //очищаем значения полей
}

formElementCard.addEventListener("submit", sendingFormSubmit);
