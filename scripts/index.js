import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './InitialCards.js';



const popupList = document.querySelectorAll('.popup');
/*imagePopup*/
const imagePopup = document.querySelector('.popup_image')
const imagePopupTitle = imagePopup.querySelector('.popup__title_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupClose = imagePopup.querySelector('.popup__close_image');
/*editForm*/
const editPopup = document.querySelector('.popup_edit');
const editButton = document.querySelector('.profile__edit-button');
const editForm = editPopup.querySelector('.popup__form_edit');
const editFormSubmit = editForm.querySelector('.popup__submit');
const popupCloseEdit = editPopup.querySelector('.popup__close_edit');
const username = editPopup.querySelector('.popup__input_user_name');
const userInfo = editPopup.querySelector('.popup__input_user_info');
const defaultUserName = document.querySelector('.profile__title');
const defaultUserInfo = document.querySelector('.profile__subtitle');
/*addForm*/
const addPopup = document.querySelector('.popup_add');
const addButton = document.querySelector('.profile__add-button');
const addForm = addPopup.querySelector('.popup__form_add');
const addFormSubmit = addForm.querySelector('.popup__submit');
const popupCloseAdd = addPopup.querySelector('.popup__close_add');
const placeName = addPopup.querySelector('.popup__input_place_name');
const placeImage = addPopup.querySelector('.popup__input_place_image');
const cardsContainer = document.querySelector('.cards');

const classesForValidation = {
  formInput: 'popup__input',
  formInputInvalid: 'popup__input_invalid',
  formSubmit: 'popup__submit',
  formSubmitDisabled: 'popup__submit_disabled',
  formErrorActive: 'popup__error_active'
};


export function openImagePopup(name, link) {
  imagePopupTitle.textContent = name;
  imagePopupPicture.src = link;
  openPopup(imagePopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

function openProfilePopup(popup) {
  username.value = defaultUserName.textContent; 
  userInfo.value = defaultUserInfo.textContent;
  editFormSubmit.classList.remove('popup__submit_disabled');
  editFormSubmit.removeAttribute('disabled', 'disabled');
  
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

  const newCardData = {
    name: placeName.value,
    link: placeImage.value
  }

  const card = new Card(newCardData, '.card-template');
  const newCard = card.generateCard();
  cardsContainer.append(newCard);
  
  closePopup(addPopup);
  addForm.reset();
  addFormSubmit.classList.add('popup__submit_disabled');
  addFormSubmit.setAttribute('disabled', 'disabled');
};

function closePopupByEscape(event) { /*Закрытие попапа нажатием ESC*/
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};



popupList.forEach(popup => {
  popup.addEventListener('mousedown', event => { /*Закрытие попапа кликом по оверлею*/
    if (event.target === popup) {
      closePopup(popup)
    }
  });
});

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');
  const newCard = card.generateCard();

  cardsContainer.append(newCard);
});

editButton.addEventListener('click', () => openProfilePopup(editPopup));

popupCloseEdit.addEventListener('click', () => closePopup(editPopup));

addButton.addEventListener('click', () => openPopup(addPopup));

popupCloseAdd.addEventListener('click', () => closePopup(addPopup));

imagePopupClose.addEventListener('click', () => closePopup(imagePopup));

editForm.addEventListener('submit', changeProfileInfo);

addForm.addEventListener('submit', createNewCard);



const editPopupForm = new FormValidator(classesForValidation, editForm);
editPopupForm.enableValidation();

const addPopupForm = new FormValidator(classesForValidation, addForm);
addPopupForm.enableValidation();