  export function createCard(element, deleteCard) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate
      .querySelector(".places__item")
      .cloneNode(true);
    const cardDeletebutton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    cardImage.src = element.link;
    cardImage.alt = element.alt;
    cardTitle.textContent = element.name;
  
    cardDeletebutton.addEventListener("click", () => deleteCard(cardElement));
  
    return cardElement;
  }

export function deleteCard(card) {
    card.remove();
  }
