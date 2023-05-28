const editPopup = document.querySelector(".popup_edit");
const addPopup = document.querySelector(".popup_add");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupCloseEdit = document.querySelector(".popup__close_edit");
const popupCloseAdd = document.querySelector(".popup__close_add");
const userName = document.querySelector(".popup__input_user_name");
const userJob = document.querySelector(".popup__input_user_job");
const defaultUserName = document.querySelector(".profile__title");
const defaultUserJob = document.querySelector(".profile__subtitle");
const editForm = document.querySelector(".popup__form_edit");
const addForm = document.querySelector(".popup__form_add");


function openPopup(attribute) {
  attribute.classList.add("popup__opened");
  userName.value = defaultUserName.textContent;
  userJob.value = defaultUserJob.textContent;
};

function closePopup(attribute) {
  attribute.classList.remove("popup__opened");
};


editButton.addEventListener("click", () => openPopup(editPopup));

popupCloseEdit.addEventListener("click", () => closePopup(editPopup));

addButton.addEventListener("click", () => openPopup(addPopup));

popupCloseAdd.addEventListener("click", () => closePopup(addPopup));

editForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  defaultUserName.textContent = userName.value;
  defaultUserJob.textContent = userJob.value;
  closePopup(popup);
});

addForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  
});