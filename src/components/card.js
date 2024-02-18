import { deleteCardApi, likeCardApi, unlikeCardApi } from "../scripts/api";

export function createCard(card, deleteCard, likeCard, openPopupImage, userId) {
  const cardId = card._id;
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeNumber = cardElement.querySelector(".card__like-number");
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardTitle.textContent = card.name;

  if (card.owner._id === userId) {
    cardDeleteButton.addEventListener("click", () => deleteCard(cardElement, cardId));
  } else {
    cardDeleteButton.style.display = 'none';
  }

  if (card.likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeButton.addEventListener("click", (env) => likeCard(env, cardId, cardLikeNumber));
  cardLikeNumber.textContent = card.likes.length;

  cardImage.addEventListener("click", () => openPopupImage(card));

  return cardElement;
}

export function deleteCard(card, cardId) {
  deleteCardApi(cardId).then(() => card.remove());
}

export function likeCard(e, cardId, cardLikeNumber) {
  if (e.target.classList.contains("card__like-button_is-active")) {
    unlikeCardApi(cardId)
      .then((card) => {
        cardLikeNumber.textContent = card.likes.length;
      });
  } else {
    likeCardApi(cardId)
      .then((card) => {
        cardLikeNumber.textContent = card.likes.length;
      });
  }
  e.target.classList.toggle("card__like-button_is-active");
}
