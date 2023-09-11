import "./index.css";

import {
  buttonOpenPopupProfile,
  formPopupProfile,
  buttonSubmitPopupProfile,
  inputUserName,
  inputAboutUser,
  userName,
  aboutUser,
  buttonOpenPopupCard,
  formPopupCard,
  buttonSubmitPopupCard,
  userAvatar,
  buttonOpenPopupAvatar,
  formPopupAvatar,
  buttonSubmitPopupAvatar,
  classesForValidation,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithDeleteCard from "../components/PopupWithDeleteCard.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-74",
  headers: {
    authorization: "af9c56b1-8df9-4cc1-aff7-4c8e6a2b0592",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({ userName, aboutUser, userAvatar });
let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;

    userInfo.setUserInfo(userData);

    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

/*Загрузка карточек которых уже есть в data*/
const cardsSection = new Section(
  {
    renderer: (item) => {
      const newCard = createCard(
        userId,
        item,
        ".card-template",
        handleCardClick,
        handleDeleteCard,
        handleLikeClick
      );
      cardsSection.addCard(newCard);
    },
  },
  ".cards"
);

/*Возвращает DOM элемент новой карточки*/
function createCard(
  userId,
  data,
  templateSelector,
  handleCardClick,
  handleDeleteCard,
  handleLikeClick
) {
  const card = new Card(
    userId,
    data,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick
  );
  return card.generateCard();
}

function handleLikeClick(cardId, didUserPutLike) {
  if (didUserPutLike) {
    api
      .removeLike(cardId)
      .then((res) => {
        this.changeLikesArray(res.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .putLike(cardId)
      .then((res) => {
        this.changeLikesArray(res.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const popupEditAvatar = new PopupWithForm(
  ".popup_type_edit-avatar",
  editAvatar
);
popupEditAvatar.setEventListeners();

function editAvatar({ link }) {
  buttonSubmitPopupAvatar.textContent = "Сохранение...";

  api
    .changeAvatar(link)
    .then((userData) => {
      userInfo.setUserInfo(userData);

      editAvatarValidation.disableSubmitButton();
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonSubmitPopupAvatar.textContent = "Сохранить";
    });
}

buttonOpenPopupAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
});



/**/
const popupShowFullImage = new PopupWithImage(".popup_type_full-image");
popupShowFullImage.setEventListeners();

/*Открывает popup image с данными карточки на которую нажали*/
function handleCardClick(name, link) {
  popupShowFullImage.open(name, link);
}

/**/
const popupProfileEdit = new PopupWithForm(
  ".popup_type_profile-edit",
  changeProfileInfo
);
popupProfileEdit.setEventListeners();

/*Берет данные из инпутов и изменяет информацию о пользователе*/
function changeProfileInfo(inputValues) {
  buttonSubmitPopupProfile.textContent = "Сохранение...";

  api
    .setUserInfo(inputValues)
    .then((newInfo) => {
      userInfo.setUserInfo(newInfo);
      popupProfileEdit.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonSubmitPopupProfile.textContent = "Сохранить";
    });
}

/*Ставит в value инпутов editPopup'а текущую информацию о пользователе*/
buttonOpenPopupProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  inputUserName.value = userData.userName;
  inputAboutUser.value = userData.aboutUser;

  popupProfileEdit.open();
});

/**/
const popupCreateCard = new PopupWithForm(
  ".popup_type_add-card",
  createNewCard
);
popupCreateCard.setEventListeners();

/*Берет value инпутов addPopup'а и создает новую карточку*/
function createNewCard(inputValues) {
  buttonSubmitPopupCard.textContent = "Создание...";

  api
    .addNewCard(inputValues)
    .then((newCardInfo) => {
      const newCard = createCard(
        userId,
        newCardInfo,
        ".card-template",
        handleCardClick,
        handleDeleteCard,
        handleLikeClick
      );
      cardsSection.addNewCard(newCard);
      popupCreateCard.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonSubmitPopupCard.textContent = "Создать";
    });
}

buttonOpenPopupCard.addEventListener("click", () => {
  addFormValidation.disableSubmitButton();
  popupCreateCard.open();
});

const popupDeleteCard = new PopupWithDeleteCard(
  ".popup_type_delete-card",
  deleteCard
);
popupDeleteCard.setEventListeners();

function handleDeleteCard(card) {
  popupDeleteCard.open();

  popupDeleteCard.sendCard(card);
}

function deleteCard(card) {
  api
    .deleteCard(card.id)
    .then(() => {
      card.deleteElCard();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

const editFormValidation = new FormValidator(
  classesForValidation,
  formPopupProfile
);
/*Запускаем валидацию формы редактирования профиля*/
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(
  classesForValidation,
  formPopupCard
);
/*Запускаем валидацию формы добавления карочек*/
addFormValidation.enableValidation();

const editAvatarValidation = new FormValidator(
  classesForValidation,
  formPopupAvatar
);
/*Запускаем валидацию формы изменения аватара*/
editAvatarValidation.enableValidation();
