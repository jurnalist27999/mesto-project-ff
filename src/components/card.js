import { deleteCardApi, likeCardApi, unlikeCardApi } from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const cardLikeButtonActiveClass = 'card__like-button_is-active';

function getCardTemplate() {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeNumber = cardElement.querySelector(".card__like-number");

  return {
    cardElement,
    cardDeleteButton,
    cardImage,
    cardTitle,
    cardLikeButton,
    cardLikeNumber,
  };
}

export function createCard(card, deleteCard, likeCard, openPopupImage, userId) {
  const {
    cardElement,
    cardDeleteButton,
    cardImage,
    cardTitle,
    cardLikeButton,
    cardLikeNumber,
  } = getCardTemplate();

  const cardId = card._id;

  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardTitle.textContent = card.name;

  if (card.owner._id === userId) {
    cardDeleteButton.addEventListener("click", () => deleteCard(cardElement, cardId));
  } else {
    cardDeleteButton.style.display = 'none';
  }

  if (card.likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add(cardLikeButtonActiveClass);
  }
  cardLikeNumber.textContent = card.likes.length;

  cardLikeButton.addEventListener("click", (env) => likeCard(env, cardId, cardLikeNumber));
  cardImage.addEventListener("click", () => openPopupImage(card));

  return cardElement;
}

export function deleteCard(card, cardId) {
  deleteCardApi(cardId)
    .then(() => card.remove())
    .catch(console.error); // выводим ошибку в консоль
}

export function likeCard(e, cardId, cardLikeNumber) {
  if (e.target.classList.contains(cardLikeButtonActiveClass)) {
    unlikeCardApi(cardId)
      .then((card) => {
        cardLikeNumber.textContent = card.likes.length;
        e.target.classList.remove(cardLikeButtonActiveClass);
      })
      .catch(console.error); // выводим ошибку в консоль
  } else {
    likeCardApi(cardId)
      .then((card) => {
        cardLikeNumber.textContent = card.likes.length;
        e.target.classList.add(cardLikeButtonActiveClass);
      })
      .catch(console.error); // выводим ошибку в консоль
  }
}
