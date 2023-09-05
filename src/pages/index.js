import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';



const editButton = document.querySelector('.profile__edit-button');
const formProfilePopup = document.querySelector('.popup__form_edit');
const profileSubmitButton = formProfilePopup.querySelector('.popup__submit');
const inputUserName = formProfilePopup.querySelector('.popup__input_user-name');
const inputAboutUser = formProfilePopup.querySelector('.popup__input_about-user');
const userName = document.querySelector('.profile__title');
const aboutUser = document.querySelector('.profile__subtitle');

const addButton = document.querySelector('.profile__add-button');
const formCardPopup = document.querySelector('.popup__form_add');
const cardSubmitButton = formCardPopup.querySelector('.popup__submit');

const userAvatar = document.querySelector('.profile__avatar');
const editAvatarButton = document.querySelector('.profile__avatar-edit');
const formAvatarPopup = document.querySelector('.popup__form_edit-avatar');
const avatarSubmitButton = formAvatarPopup.querySelector('.popup__submit');
let userId;
/*Обьект с классами для валидации*/
const classesForValidation = {
  formInput: 'popup__input',
  formInputInvalid: 'popup__input_invalid',
  formSubmit: 'popup__submit',
  formSubmitDisabled: 'popup__submit_disabled',
  formErrorActive: 'popup__error_active'
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: 'af9c56b1-8df9-4cc1-aff7-4c8e6a2b0592',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards()
  .then(arrayCards => {
    cardsSection.renderItems(arrayCards);
  })
  .catch(err => {
    console.error(err);
  });


api.getUserInfo()
  .then(info => {
    userName.textContent = info.name;
    aboutUser.textContent = info.about;
    userAvatar.src = info.avatar;
    userId = info._id;
  })
  .catch(err => {
    console.error(err);
  });

/*Загрузка карточек которых уже есть в data*/ 
const cardsSection = new Section({ 
  renderer: (item) => {
    const newCard = createCard(userId, item, '.card-template', handleCardClick, handleDeleteCard, handleLikeClick);
    cardsSection.addItem(newCard);
  } 
}, '.cards');



/*Возвращает DOM элемент новой карточки*/ 
function createCard(userId, data, templateSelector, handleCardClick, handleDeleteCard, handleLikeClick) {
  const card = new Card(userId, data, templateSelector, handleCardClick, handleDeleteCard, handleLikeClick);
  return card.generateCard();
}

function handleLikeClick(cardId, didUserPutLike) {
  if (didUserPutLike) {
    api.removeLike(cardId)
      .then(res => {
        this.changeLikesArray(res.likes);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    api.putLike(cardId)
      .then(res => {
        this.changeLikesArray(res.likes);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

const formEditAvatar = new PopupWithForm('.popup_type_edit-avatar', editAvatar);
formEditAvatar.setEventListeners();

function editAvatar({ link }) {
  avatarSubmitButton.textContent = 'Сохранение...';

  api.changeAvatar(link)
    .then(userData => {
      userAvatar.src = userData.avatar;
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = 'Сохранить';
    });

  editAvatarValidation.disableSubmitButton();
  formEditAvatar.close();
}

editAvatarButton.addEventListener('click', () => {
  formEditAvatar.open()
})


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
  profileSubmitButton.textContent = 'Сохранение...';

  api.setUserInfo(inputValues)
    .then(newInfo => {
      userName.textContent = newInfo.name;
      aboutUser.textContent = newInfo.about;
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = 'Сохранить';
    });
  formEdit.close();
};

/*Ставит в value инпутов editPopup'а текущую информацию о пользователе*/ 
editButton.addEventListener('click', () => {
  api.getUserInfo()
    .then(info => {
      inputUserName.value = info.name;
      inputAboutUser.value = info.about;
    })
    .catch(err => {
      console.error(err);
    });
  
  editFormValidation.enableSubmitButton();
  formEdit.open();
});


/**/ 
const formCard = new PopupWithForm('.popup_type_add-card', createNewCard);
formCard.setEventListeners();

/*Берет value инпутов addPopup'а и создает новую карточку*/ 
function createNewCard(inputValues) {
  cardSubmitButton.textContent = 'Создание...';

  api.addNewCard(inputValues)
    .then(newCardInfo => {
      const newCard = createCard(userId, newCardInfo, '.card-template', handleCardClick, handleDeleteCard, handleLikeClick);
      cardsSection.addItem(newCard);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      cardSubmitButton.textContent = 'Создать';
    })
  
  formCard.close();
};
 
addButton.addEventListener('click', () => {
  addFormValidation.disableSubmitButton();
  formCard.open();
});



const formDeleteCard = new PopupWithDeleteCard('.popup_type_delete-card', deleteCard);
formDeleteCard.setEventListeners();

function handleDeleteCard(cardId, card) {
  formDeleteCard.open();

  formDeleteCard.sendCardAndId(cardId, card);
};

function deleteCard(cardId) {
  api.deleteCard(cardId)
    .then(() => {
      formDeleteCard.deleteElCard();
      formDeleteCard.close();
    })
    .catch(err => {
      console.error(err);
    });
};


const editFormValidation = new FormValidator(classesForValidation, formProfilePopup);
/*Запускаем валидацию формы редактирования профиля*/
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(classesForValidation, formCardPopup);
/*Запускаем валидацию формы добавления карочек*/
addFormValidation.enableValidation();

const editAvatarValidation = new FormValidator(classesForValidation, formAvatarPopup);

editAvatarValidation.enableValidation();