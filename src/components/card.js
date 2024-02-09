export function createCard(element, deleteCard, likeCard, openPopupImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardDeletebutton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = element.link;
  cardImage.alt = element.alt;
  cardTitle.textContent = element.name;

  cardDeletebutton.addEventListener("click", () => deleteCard(cardElement));
  cardLikeButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => openPopupImage(element));

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(e) {
  e.target.classList.toggle("card__like-button_is-active");
}
