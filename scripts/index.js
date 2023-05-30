/*popupImage*/
const popupImage = document.querySelector(".popupImage")
const popupImageTitle = popupImage.querySelector(".popupImage__title");
const popupImagePicture = popupImage.querySelector(".popupImage__picture");
const popupImageClose = popupImage.querySelector(".popupImage__close");
/*editForm*/
const editPopup = document.querySelector(".popup_edit");
const editButton = document.querySelector(".profile__edit-button");
const editForm = editPopup.querySelector(".popup__form_edit");
const popupCloseEdit = editPopup.querySelector(".popup__close_edit");
const userName = editPopup.querySelector(".popup__input_user_name");
const userJob = editPopup.querySelector(".popup__input_user_job");
const defaultUserName = document.querySelector(".profile__title");
const defaultUserJob = document.querySelector(".profile__subtitle");
/*addForm*/
const addPopup = document.querySelector(".popup_add");
const addButton = document.querySelector(".profile__add-button");
const addForm = addPopup.querySelector(".popup__form_add");
const popupCloseAdd = addPopup.querySelector(".popup__close_add");
const placeName = addPopup.querySelector(".popup__input_place_name");
const placeImage = addPopup.querySelector(".popup__input_place_image");
const cardTemplate = document.querySelector(".card-template");
const cardTemplateContent = cardTemplate.content;
const card = cardTemplateContent.querySelector(".card");
const cards = document.querySelector(".cards");
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



function createCard(item) {
  const newCard = card.cloneNode(true); /*cloneCardTemplate*/

  const newCardImage = newCard.querySelector(".card__image"); 
  newCardImage.src = item.link;
  newCardImage.alt = item.name;
  const newCardTitle = newCard.querySelector(".card__title");
  newCardTitle.textContent = item.name;

  const deleteButton = newCard.querySelector(".card__delete-button"); /*deleteButton*/
  deleteButton.addEventListener("click", function() {
    cards.removeChild(newCard);
  })
  
  const cardLike = newCard.querySelector(".card__like-button"); /*likeButton*/
  cardLike.addEventListener("click", function() {
    cardLike.classList.toggle("card__like-button_active");
  });

  const cardImage = newCard.querySelector(".card__image"); /*popupImageOpened*/
  cardImage.addEventListener("click", function() {
    popupImageTitle.textContent = newCardTitle.textContent;
    popupImagePicture.src = newCardImage.src;
    popupImage.classList.add("popupImage_opened");
  })
  
  popupImageClose.addEventListener("click", function() { /*popupImageClose*/
    popupImage.classList.remove("popupImage_opened");
  })

  return newCard
};

function openPopup(attribute) {
  attribute.classList.add("popup__opened");
  userName.value = defaultUserName.textContent; 
  userJob.value = defaultUserJob.textContent;
};

function closePopup(attribute) {
  attribute.classList.remove("popup__opened");
};



initialCards.forEach(function(item) {
  const newCard = createCard(item);
  cards.prepend(newCard);
});

editButton.addEventListener("click", () => openPopup(editPopup));

popupCloseEdit.addEventListener("click", () => closePopup(editPopup));

addButton.addEventListener("click", () => openPopup(addPopup));

popupCloseAdd.addEventListener("click", () => closePopup(addPopup));

editForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  defaultUserName.textContent = userName.value;
  defaultUserJob.textContent = userJob.value;
  closePopup(editPopup);
});

addForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const newCard = createCard(placeName.value, placeImage.value)
  cards.prepend(newCard);

  placeName.value = '';
  placeImage.value = '';
  closePopup(addPopup);
});