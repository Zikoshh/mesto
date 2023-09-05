export default class Card {
  constructor(userId, data, templateSelector, handleCardClick, handleDeleteCard, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    console.log(data.likes)
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleDeleteCard = handleDeleteCard;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
  }

  _setEventListeners() {
    this._checkCardOwner();
    
    this._newCardLike.addEventListener('click', () => {
      this._handleLikeClick(this._id, this._didUserPutLike());
    });

    this._newCardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  changeLikesArray(likes) {
    this._likesCounter.textContent = likes.length;
    this._likes = likes;
    this._didUserPutLike() ? this._newCardLike.classList.add('card__like-button_active') : this._newCardLike.classList.remove('card__like-button_active');
  }

  _didUserPutLike() {
    return this._likes.some(user => {
      return user._id === this._userId;
    })
  }
  
  _checkCardOwner() {
    if (this._ownerId === this._userId) {
      this._newCardDelete.addEventListener('click', () => {
        this._handleDeleteCard(this._id, this._newCard);
      });
    } else {
      this._newCardDelete.remove();
      this._newCardDelete = null;
    }
  }

  generateCard() {
    this._newCard = this._getTemplate();

    this._newCardImage = this._newCard.querySelector('.card__image');
    this._newCardTitle = this._newCard.querySelector('.card__title');
    this._newCardLike = this._newCard.querySelector('.card__like-button');
    this._newCardDelete = this._newCard.querySelector('.card__delete-button');
    this._likesCounter = this._newCard.querySelector('.card__likes-counter');

    this._setEventListeners();

    this._didUserPutLike() ? this._newCardLike.classList.add('card__like-button_active') : this._newCardLike.classList.remove('card__like-button_active');

    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._name;
    this._newCardTitle.textContent = this._name;
    this._likesCounter.textContent = this._likes.length;

    return this._newCard;
  }
}