import "./pages/index.css";
import { initialCards } from "./cards.js";
import {
  openModal,
  closeModal,
  closeOverlay,
} from "./components/modal.js";
import { createCard, deleteCard} from "./components/card.js";

const placesList = document.querySelector(".places__list");

//удаление карточки по клику на корзинку
initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  placesList.append(card);
});


const formEdit = document.querySelector(".popup_type_edit"); // попап редактирования
const formCard = document.querySelector(".popup_type_new-card"); // попап карточки

const profileEditbutton = document.querySelector(".profile__edit-button"); // кнопка открытия редактирования
const profileAddbutton = document.querySelector(".profile__add-button"); // кнопка открытия карточки

const popupCloseProfile = formEdit.querySelector(".popup__close"); // кнопка закрытия попапа редактирования
const popupCloseCard = formCard.querySelector(".popup__close"); // кнопка закрытия попапа карточки

profileEditbutton.addEventListener("click", () => openModal(formEdit)); // открытие по клику кнопки редактирования
popupCloseProfile.addEventListener("click", () => closeModal(formEdit)); // закрытие по клику кнопки

profileAddbutton.addEventListener("click", () => openModal(formCard)); // открытие по клику кнопки карточки
popupCloseCard.addEventListener("click", () => closeModal(formCard)); // закрытие по клику кнопки карточки

formEdit.addEventListener("mousedown", closeOverlay); // закрытие попапа редактирования по оверлею
formCard.addEventListener("mousedown", closeOverlay); // закрытие попапа карточки по оверлею

//реализация закрытия попапа по нажатию на клавишу
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    formEdit.classList.remove("popup_is-opened") ||
      formCard.classList.remove("popup_is-opened");
  }
});

//пишем в форме
// Находим форму в DOM
const formElement = document.querySelector('[name="edit-profile"]'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault();
  // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  const name = nameInput.value;
  const job = jobInput.value;
  // Вставьте новые значения с помощью textContent
  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = job;

  closeModal(document.querySelector(".popup_is-opened"));
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

const nameTitle = document.querySelector(".profile__title"); //нужно для отображения текущих данных со страницы в полях формы
const jobDescription = document.querySelector(".profile__description"); //нужно для отображения текущих данных со страницы в полях формы
//по клику кнопки в полях формы отображются текущие данные со страницы

profileEditbutton.addEventListener("click", function () {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobDescription.textContent;
});

//попап 
const formElementCard = document.querySelector('[name="new-place"]');
//поля форм
const nameInputCard = document.querySelector(".popup__input_type_card-name");
const urlInputCard = document.querySelector(".popup__input_type_url");

//обработчик отправки формы
function sendingFormSubmit(evt) {
evt.preventDefault(); 

//значения полей nameInputCard и urlInputCard из свойства value

const nameCard = nameInputCard.value;
const urlCard = urlInputCard.value;

const card = createCard({nameCard, urlCard}); 
placesList.prepend(card);

closeModal(document.querySelector(".popup_is-opened"));
};

profileAddbutton.addEventListener("click", function() {
  nameInputCard.value = '';
  urlInputCard.value = '';
});

formElementCard.addEventListener('submit', sendingFormSubmit);

//const likeButton = document.querySelector(".card__like-button");

//likeButton.addEventListener('click', )







//по клику на сохранить новая карточка попадает в начало контейнера с карточками



/*const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10 */

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
