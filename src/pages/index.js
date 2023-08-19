import './index.css';
import Api from '../components/Api.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';



const editButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.popup__form_edit');
const inputUserName = editForm.querySelector('.popup__input_user-name');
const inputAboutUser = editForm.querySelector('.popup__input_about-user');
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup__form_add');
const userName = document.querySelector('.profile__title');
const aboutUser = document.querySelector('.profile__subtitle');
const userAvatar = document.querySelector('.profile__avatar');
/*Обьект с классами для валидации*/
const classesForValidation = {
  formInput: 'popup__input',
  formInputInvalid: 'popup__input_invalid',
  formSubmit: 'popup__submit',
  formSubmitDisabled: 'popup__submit_disabled',
  formErrorActive: 'popup__error_active'
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '8021284e-33ae-49a9-9588-39e65f8169ae',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards()
  .then(arrayCards => {
    cardsSection.renderItems(arrayCards);
  })
  .catch(error => {
    console.error(error);
  });


api.getUserInfo()
  .then(info => {
    userName.textContent = info.name;
    aboutUser.textContent = info.about;
    userAvatar.style.backgroundImage = `url(${info.avatar})`;
  })

/*Загрузка карточек которых уже есть в data*/ 
const cardsSection = new Section({ 
  renderer: (item) => {
    const newCard = createCard(item, '.card-template', handleCardClick);
    cardsSection.addItem(newCard);
  } 
}, '.cards');



/*Возвращает DOM элемент новой карточки*/ 
function createCard(data, templateSelector, handleCardClick) {
  const card = new Card(data, templateSelector, handleCardClick);
  return card.generateCard();
}


/**/ 
const popupWithImage = new PopupWithImage( '.popup_type_full-image' );
popupWithImage.setEventListeners();

/*Открывает popup image с данными карточки на которую нажали*/ 
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}


/**/ 
const formEdit = new PopupWithForm('.popup_type_profile-edit', changeProfileInfo);
formEdit.setEventListeners();

/*Берет данные из инпутов и изменяет информацию о пользователе*/ 
function changeProfileInfo(inputValues) {
  api.setUserInfo(inputValues)
  .then(newInfo => {
    userName.textContent = newInfo.name;
    aboutUser.textContent = newInfo.about;
  })
  formEdit.close();
};

/*Ставит в value инпутов editPopup'а текущую информацию о пользователе*/ 
editButton.addEventListener('click', () => {
  api.getUserInfo()
  .then(info => {
    inputUserName.value = info.name;
    inputAboutUser.value = info.about;
  })
  
  editPopupForm.enableSubmitButton();
  formEdit.open();
});


/**/ 
const formCard = new PopupWithForm('.popup_type_add-card', createNewCard);
formCard.setEventListeners();

/*Берет value инпутов addPopup'а и создает новую карточку*/ 
function createNewCard(inputValues) {
  api.addNewCard(inputValues)
  .then(newCardInfo => {
    const newCard = createCard(newCardInfo, '.card-template', handleCardClick);
    cardsSection.addItem(newCard);
  })
  
  formCard.close();
};
 
addButton.addEventListener('click', () => {
  addPopupForm.disableSubmitButton();
  formCard.open();
});



const editPopupForm = new FormValidator(classesForValidation, editForm);
/*Запускаем валидацию формы редактирования профиля*/
editPopupForm.enableValidation();

const addPopupForm = new FormValidator(classesForValidation, addForm);
/*Запускаем валидацию формы добавления карочек*/
addPopupForm.enableValidation();