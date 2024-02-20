import "./pages/index.css";
import { openPopup, closeActivePopup } from "./components/modal.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { addCard, getInitialCards, getProfile, updateProfileAvatar, updateProfileInfo } from "./components/api";
import { clearValidation, enableValidation } from "./components/validation";
const placesList = document.querySelector(".places__list");
const formEditAvatar = document.querySelector(".popup_type_edit-avatar"); // попап редактирования аватарки
const formEdit = document.querySelector(".popup_type_edit"); // попап редактирования профиля
const formCard = document.querySelector(".popup_type_new-card"); // попап карточки
const popupTypeImage = document.querySelector(".popup_type_image"); //нашли попап изображения
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка открытия редактирования
const profileAddButton = document.querySelector(".profile__add-button"); // кнопка открытия карточки
// Находим форму в DOM
const formElementProfile = document.querySelector('[name="edit-profile"]'); // Воспользуйтесь методом querySelector()
const saveProfileButton = formElementProfile.querySelector(".popup__button");
// Находим поля формы в DOM
const formElementAvatar = document.querySelector('[name="edit-avatar"]'); // Воспользуйтесь методом querySelector()
const saveAvatarButton = formElementAvatar.querySelector(".popup__button");
// Находим поля формы в DOM
const avatarInput = document.querySelector(".popup__input_type_avatar"); // Воспользуйтесь инструментом .querySelector()
const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
//попап добавления карточки
const formElementCard = document.querySelector('[name="new-place"]');
const saveNewCardButton = formElementCard.querySelector(".popup__button");
//поля форм
const formNewPlace = formCard.querySelector(".popup__form");
const nameInputCard = formNewPlace.querySelector(
  ".popup__input_type_card-name"
);
const urlInputCard = formNewPlace.querySelector(".popup__input_type_url");

const popupImageNew = popupTypeImage.querySelector(".popup__image"); //нашли изображение
const popupCaption = popupTypeImage.querySelector(".popup__caption"); //нашли название изображения

const profileImage = document.querySelector(".profile__image"); //нужно для отображения текущих данных со страницы в полях формы
const nameTitle = document.querySelector(".profile__title"); //нужно для отображения текущих данных со страницы в полях формы
const jobDescription = document.querySelector(".profile__description"); //нужно для отображения текущих данных со страницы в полях формы

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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
  })
  .catch(console.error); // выводим ошибку в консоль

function renderLoading(button, loading) {
  if (loading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

profileEditButton.addEventListener("click", function () {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobDescription.textContent;
  clearValidation(formElementProfile, validationConfig);

  return openPopup(formEdit);
});

profileAddButton.addEventListener("click", function () {
  return openPopup(formCard);
});

profileImage.addEventListener("click", function () {
  return openPopup(formEditAvatar);
});

function openPopupImage(element) {
  popupImageNew.src = element.link; //ссылка на изображение
  popupImageNew.alt = element.alt;
  popupCaption.textContent = element.name; //ссылка на название изображения

  openPopup(popupTypeImage); //открытие попапа с изображением
}

//обработчик отправки формы профиля
function submitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderLoading(saveProfileButton, true);

  const name = nameInput.value;
  const job = jobInput.value;

  updateProfileInfo(name, job)
    .then(profile => {
      updateProfile({ name: profile.name, job: profile.about });

      closeActivePopup();
    })
    .catch(console.error) // выводим ошибку в консоль
    .finally(() => renderLoading(saveProfileButton, false));
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener("submit", submitEditProfileForm);

//обработчик отправки формы новой карточки
function submitAddCardForm(evt) {
  evt.preventDefault();
  renderLoading(saveNewCardButton, true);

  addCard(nameInputCard.value, urlInputCard.value)
    .then((card) => {
      const cardNewData = createCard(card, deleteCard, likeCard, openPopupImage, userId);
      placesList.prepend(cardNewData); //добавляем новую карточку в начало контейнера
      closeActivePopup();
      formElementCard.reset(); //очищаем значения полей
      clearValidation(formElementCard, validationConfig);
    })
    .catch(console.error) // выводим ошибку в консоль
    .finally(() => renderLoading(saveNewCardButton, false));
}

formElementCard.addEventListener("submit", submitAddCardForm);

//обработчик отправки формы аватарки
function submitUpdateAvatarForm(evt) {
  evt.preventDefault();
  renderLoading(saveAvatarButton, true);

  updateProfileAvatar(avatarInput.value)
    .then(() => {
      updateProfile({ avatar: avatarInput.value });
      closeActivePopup();
      formElementAvatar.reset(); //очищаем значения полей
      clearValidation(formElementAvatar, validationConfig);
    })
    .catch(console.error) // выводим ошибку в консоль
    .finally(() => renderLoading(saveAvatarButton, false));
}

formElementAvatar.addEventListener("submit", submitUpdateAvatarForm);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationConfig);
