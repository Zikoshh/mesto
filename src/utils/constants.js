const editButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.popup__form_edit');
const inputUserName = editForm.querySelector('.popup__input_user-name');
const inputAboutUser = editForm.querySelector('.popup__input_about-user');
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup__form_add');
/*Обьект с классами для валидации*/
const classesForValidation = {
  formInput: 'popup__input',
  formInputInvalid: 'popup__input_invalid',
  formSubmit: 'popup__submit',
  formSubmitDisabled: 'popup__submit_disabled',
  formErrorActive: 'popup__error_active'
};

export { editButton, editForm, inputUserName, inputAboutUser, addButton, addForm, classesForValidation };