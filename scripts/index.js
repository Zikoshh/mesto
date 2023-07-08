import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './InitialCards.js';



const popupList = document.querySelectorAll('.popup');
/*imagePopup*/
const imagePopup = document.querySelector('.popup_type_full-image')
const imagePopupTitle = imagePopup.querySelector('.popup__title_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupClose = imagePopup.querySelector('.popup__close_image');
/*editForm*/
const editPopup = document.querySelector('.popup_type_profile-edit');
const editButton = document.querySelector('.profile__edit-button');
const editForm = editPopup.querySelector('.popup__form_edit');
const editFormSubmit = editForm.querySelector('.popup__submit');
const popupCloseEdit = editPopup.querySelector('.popup__close_edit');
const username = editPopup.querySelector('.popup__input_user_name');
const userInfo = editPopup.querySelector('.popup__input_user_info');
const defaultUserName = document.querySelector('.profile__title');
const defaultUserInfo = document.querySelector('.profile__subtitle');
/*addForm*/
const addPopup = document.querySelector('.popup_type_add-card');
const addButton = document.querySelector('.profile__add-button');
const addForm = addPopup.querySelector('.popup__form_add');
const addFormSubmit = addForm.querySelector('.popup__submit');
const popupCloseAdd = addPopup.querySelector('.popup__close_add');
const placeName = addPopup.querySelector('.popup__input_place_name');
const placeImage = addPopup.querySelector('.popup__input_place_image');
/*Контейнер для карточек*/
const cardsContainer = document.querySelector('.cards');
/*Обьект с классами для валидации*/
const classesForValidation = {
  formInput: 'popup__input',
  formInputInvalid: 'popup__input_invalid',
  formSubmit: 'popup__submit',
  formSubmitDisabled: 'popup__submit_disabled',
  formErrorActive: 'popup__error_active'
};


function openImagePopup(name, link) {
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
  
  editPopupForm.disableSubmitButton();
  
  openPopup(popup);
};

/*Редактирование информации профиля для ивент сабмита editForm*/
function changeProfileInfo(form) {
  form.preventDefault();
  defaultUserName.textContent = username.value;
  defaultUserInfo.textContent = userInfo.value;
  closePopup(editPopup);
};

/*Создание новой карточки для ивент сабмита addForm*/
function createNewCard(form) {
  form.preventDefault();

  const newCardData = {
    name: placeName.value,
    link: placeImage.value
  }

  const newCard = createCard(newCardData, '.card-template', openImagePopup);
  cardsContainer.prepend(newCard);
  
  closePopup(addPopup);
  addForm.reset();
  addPopupForm.enableSubmitButton();
};

/*Закрытие попапа нажатием ESC*/
function closePopupByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

/*Генерирует новую карточку*/
function createCard(data, templateSelector, openImagePopup) {
  const card = new Card(data, templateSelector, openImagePopup);
  return card.generateCard();
}



popupList.forEach(popup => {
  /*Закрытие попапа кликом по оверлею*/
  popup.addEventListener('mousedown', event => {
    if (event.target === popup) {
      closePopup(popup)
    }
  });
});

/*Загрузка data с уже добавленными местами*/
initialCards.forEach((item) => {
  const newCard = createCard(item, '.card-template', openImagePopup)

  cardsContainer.prepend(newCard);
});

editButton.addEventListener('click', () => openProfilePopup(editPopup));

popupCloseEdit.addEventListener('click', () => closePopup(editPopup));

addButton.addEventListener('click', () => openPopup(addPopup));

popupCloseAdd.addEventListener('click', () => closePopup(addPopup));

imagePopupClose.addEventListener('click', () => closePopup(imagePopup));

/*Вещаем на ивент сабмита редактирование профиля*/
editForm.addEventListener('submit', changeProfileInfo);

/*Вещаем на ивент сабмита создание новой карточки*/
addForm.addEventListener('submit', createNewCard);



const editPopupForm = new FormValidator(classesForValidation, editForm);
/*Запускаем валидацию формы редактирования профиля*/
editPopupForm.enableValidation();

const addPopupForm = new FormValidator(classesForValidation, addForm);
/*Запускаем валидацию формы добавления карочек*/
addPopupForm.enableValidation();