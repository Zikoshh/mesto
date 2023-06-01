/*popupImage*/
const imagePopup = document.querySelector(".popup_image")
const imagePopupTitle = imagePopup.querySelector(".popup__title_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupClose = imagePopup.querySelector(".popup__close_image");
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
const cardsContainer = document.querySelector(".cards");



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
  userName.value = defaultUserName.textContent; 
  userJob.value = defaultUserJob.textContent;
  openPopup(popup);
};

function changeProfileInfo(form) {
  form.preventDefault();
  defaultUserName.textContent = userName.value;
  defaultUserJob.textContent = userJob.value;
  closePopup(editPopup);
};

function createNewCard(form) {
  form.preventDefault();
  const placeNameValue = placeName.value;
  const placeImageValue = placeImage.value;
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