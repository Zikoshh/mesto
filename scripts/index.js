const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".profile__edit-button");
const popupClose = document.querySelector(".popup__close");
const userName = popup.querySelector("#username");
const userJob = popup.querySelector("#userjob");
const defaultUserName = document.querySelector(".profile__title");
const defaultUserJob = document.querySelector(".profile__subtitle");
const formElement = popup.querySelector(".popup__form");


popupEdit.addEventListener("click", function() {
  openPopup(popup);
});

popupClose.addEventListener("click", function() {
  closePopup(popup);
});

userName.value = defaultUserName.textContent;
userJob.value = defaultUserJob.textContent;

formElement.addEventListener("submit", function(event) {
  event.preventDefault();
  defaultUserName.textContent = userName.value;
  defaultUserJob.textContent = userJob.value;
  closePopup(popup);
});

function openPopup(attribute) {
  attribute.classList.add("popup__opened");
};

function closePopup(attribute) {
  attribute.classList.remove("popup__opened");
};
