/*imagePopup*/
const imagePopup = document.querySelector(".popup_image")
const imagePopupTitle = imagePopup.querySelector(".popup__title_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupClose = imagePopup.querySelector(".popup__close_image");
/*editForm*/
const editPopup = document.querySelector(".popup_edit");
const editButton = document.querySelector(".profile__edit-button");
const editForm = editPopup.querySelector(".popup__form_edit");
const popupCloseEdit = editPopup.querySelector(".popup__close_edit");
const username = editPopup.querySelector(".popup__input_user_name");
const userInfo = editPopup.querySelector(".popup__input_user_info");
const defaultUserName = document.querySelector(".profile__title");
const defaultUserInfo = document.querySelector(".profile__subtitle");
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
const cardsContainer = document.querySelector(".cards");
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



function createCard(name, link) {
  const newCard = card.cloneNode(true); /*cloneCardTemplate*/

  const newCardImage = newCard.querySelector(".card__image"); 
  newCardImage.src = link;
  newCardImage.alt = name;
  const newCardTitle = newCard.querySelector(".card__title");
  newCardTitle.textContent = name;

  const deleteButton = newCard.querySelector(".card__delete-button"); /*deleteButton*/
  deleteButton.addEventListener("click", function() {
    deleteButton.closest(".card").remove();
  })
  
  const cardLike = newCard.querySelector(".card__like-button"); /*likeButton*/
  cardLike.addEventListener("click", function() {
    cardLike.classList.toggle("card__like-button_active");
  });

  const cardImage = newCard.querySelector(".card__image"); /*popupImageOpened*/
  cardImage.addEventListener("click", function() {
    imagePopupTitle.textContent = newCardTitle.textContent;
    imagePopupPicture.src = newCardImage.src;
    openPopup(imagePopup);
  })

  return newCard
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  
};

function openProfilePopup(popup) {
  username.value = defaultUserName.textContent; 
  userInfo.value = defaultUserInfo.textContent;
  openPopup(popup);
};

function changeProfileInfo(form) {
  form.preventDefault();
  defaultUserName.textContent = username.value;
  defaultUserInfo.textContent = userInfo.value;
  closePopup(editPopup);
};

function createNewCard(form) {
  form.preventDefault();
  const placeNameValue = placeName.value;
  const placeImageValue = placeImage.value;
  if (!(placeNameValue && placeImageValue)) {
    return;
  }
  const newCard = createCard(placeNameValue, placeImageValue);
  cardsContainer.prepend(newCard);

  addForm.reset();
  closePopup(addPopup);
};



initialCards.forEach(function(item) {
  const newCard = createCard(item.name, item.link);
  cardsContainer.prepend(newCard);
});

editButton.addEventListener("click", () => openProfilePopup(editPopup));

popupCloseEdit.addEventListener("click", () => closePopup(editPopup));

addButton.addEventListener("click", () => openPopup(addPopup));

popupCloseAdd.addEventListener("click", () => closePopup(addPopup));

imagePopupClose.addEventListener("click", () => closePopup(imagePopup));

editForm.addEventListener("submit", changeProfileInfo);

addForm.addEventListener("submit", createNewCard);