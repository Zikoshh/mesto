import './index.css';

import { 
  editButton, 
  editForm, 
  inputUserName, 
  inputAboutUser, 
  addButton, 
  addForm, 
  classesForValidation } from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../components/InitialCards.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';



/*Загрузка карточек которых уже есть в data*/ 
const cardList = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    const newCard = createCard(item, '.card-template', handleCardClick);
    cardList.addItem(newCard);
  } 
}, '.cards');

cardList.renderItems();


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
const userInfo = new UserInfo({ userName: '.profile__title', aboutUser: '.profile__subtitle' });

/*Берет данные из инпутов и изменяет информацию о пользователе*/ 
function changeProfileInfo(inputValues) {
  userInfo.setUserInfo(inputValues);
  formEdit.close();
};

/*Ставит в value инпутов editPopup'а текущую информацию о пользователе*/ 
editButton.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  inputUserName.value = userInfoData.userName;
  inputAboutUser.value = userInfoData.aboutUser;
  editPopupForm.enableSubmitButton();
  formEdit.open();
});


/**/ 
const formCard = new PopupWithForm('.popup_type_add-card', createNewCard);
formCard.setEventListeners();

/*Берет value инпутов addPopup'а и создает новую карточку*/ 
function createNewCard(inputValues) {
  const newCardData = {
    name: inputValues.placeName,
    link: inputValues.placeImage
  }

  const newCard = createCard(newCardData, '.card-template', handleCardClick);
  cardList.addItem(newCard);
  
  formCard.close();
  addPopupForm.disableSubmitButton();
};
 
addButton.addEventListener('click', () => {
  formCard.open();
});



const editPopupForm = new FormValidator(classesForValidation, editForm);
/*Запускаем валидацию формы редактирования профиля*/
editPopupForm.enableValidation();

const addPopupForm = new FormValidator(classesForValidation, addForm);
/*Запускаем валидацию формы добавления карочек*/
addPopupForm.enableValidation();