const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".profile__edit-button");
const popupClose = document.querySelector(".popup__close");
const userName = popup.querySelector(".popup__input_user_name");
const userJob = popup.querySelector(".popup__input_user_job");
const defaultUserName = document.querySelector(".profile__title");
const defaultUserJob = document.querySelector(".profile__subtitle");
const formElement = popup.querySelector(".popup__form");


function openPopup(attribute) {
  attribute.classList.add("popup__opened");
  userName.value = defaultUserName.textContent;
  userJob.value = defaultUserJob.textContent;
};

function closePopup(attribute) {
  attribute.classList.remove("popup__opened");
};


popupEdit.addEventListener("click", function() {
  openPopup(popup);
});

popupClose.addEventListener("click", function() {
  closePopup(popup);
});

formElement.addEventListener("submit", function(event) {
  event.preventDefault();
  defaultUserName.textContent = userName.value;
  defaultUserJob.textContent = userJob.value;
  closePopup(popup);
});