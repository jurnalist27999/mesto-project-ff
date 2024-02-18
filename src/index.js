import "./pages/index.css";
import { openPopup, closeActivePopup } from "./components/modal.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { addCard, getInitialCards, getProfile, updateProfileInfo } from "./scripts/api";
import { enableValidation } from "./scripts/validation";
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

const profileImage = document.querySelector(".profile__image"); //нужно для отображения текущих данных со страницы в полях формы
const nameTitle = document.querySelector(".profile__title"); //нужно для отображения текущих данных со страницы в полях формы
const jobDescription = document.querySelector(".profile__description"); //нужно для отображения текущих данных со страницы в полях формы

let userId;

function updateProfile({ avatar, name, job }) {
  if (avatar) {
    profileImage.style.backgroundImage = `url("${avatar}")`;
  }
  if (name && job) {
    nameTitle.textContent = name;
    jobDescription.textContent = job;
  }
}
// const popups = document.querySelectorAll(".popup"); //общий попап
Promise.all([getProfile(), getInitialCards()])
  .then(([profile, cards]) => {
    userId = profile._id;
    updateProfile({ avatar: profile.avatar, name: profile.name, job: profile.about });
    cards.forEach((item) => {
      const card = createCard(item, deleteCard, likeCard, openPopupImage, userId);
      placesList.append(card);
    });
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

//обработчик отправки формы профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = nameInput.value;
  const job = jobInput.value;
  nameTitle.textContent = name; // Вставьте новые значения с помощью textContent
  jobDescription.textContent = job;
  updateProfileInfo(name, job)
    .then(profile => updateProfile({ name: profile.name, job: profile.about }));

  closeActivePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//обработчик отправки формы новой карточки
function sendingFormSubmit(evt) {
  evt.preventDefault();

  addCard(nameInputCard.value, urlInputCard.value)
    .then((card) => {
      const cardNewData = createCard(card, deleteCard, likeCard, openPopupImage, userId);
      placesList.prepend(cardNewData); //добавляем новую карточку в начало контейнера
      closeActivePopup();
      formElementCard.reset(); //очищаем значения полей
    });
}

formElementCard.addEventListener("submit", sendingFormSubmit);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
