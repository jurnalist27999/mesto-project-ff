// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardImage = document.querySelector(".card__image");
const cardDeletebutton = document.querySelector(".card__delete-button");
const cardTitle = document.querySelector(".card__title");
const cardLikebutton = document.querySelector(".card__like-button");
const profileAddbutton = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  placesList.append(card);
});

function createCard(element, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardDeletebutton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.alt;
  cardElement.querySelector(".card__title").textContent = element.name;

  cardDeletebutton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}
