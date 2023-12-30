// @todo: Темплейт карточки

// @todo: DOM узлы

const cardImage = document.querySelector('.card__image');
const cardDeletebutton = document.querySelector('card__delete-button');
const cardTitle = document.querySelector('card__title');
const cardLikebutton = document.querySelector('card__like-button');
const profileAddbutton = document.querySelector('profile__add-button');

// @todo: Функция создания карточки

cards.forEach(function(element) {
    initialCards(element);
});

function initialCards(element, cardDelete) { /*аргумент данных одной карточки, функция-колбэк для удаления*/
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);  /*Метод cloneNode только копирует элемент, но не добавляет его в DOM. Для этого к копии используют append или другой метод добавления*/
cardElement.querySelector('.card__image').src = element.link;
cardElement.querySelector('card__title').textContent = element.name;

placesList.append(cardElement);
}

function cardDelete() {
    cardElement.remove();
}

cardDeletebutton.addEventListener('click', function (event) {
    console.log(event);
    event.target.classList.toggle('card__delete-button')
});

// @todo: Функция удаления карточки


// @todo: Вывести карточки на страницу



