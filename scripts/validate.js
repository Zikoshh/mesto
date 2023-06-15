const validators = {
  username: validateUsername,
  userInfo: validateUserInfo,
  placeName: validatePlaceName,
  placeLink: validatePlaceLink
};

const classNames = {
  input: 'popup__input',
  inputInvalid: 'popup__input_invalid',
  error: 'popup__error'
}



function enableValidation(form, validators, classNames) {
  const submitButton = form.querySelector('.popup__submit')

  const validate = (key, value) => { /*return null or errorMessage*/
    const validator = validators[key];
    return validator(value);
  };


  const getInputElement = key => {
    return form.querySelector(`.${classNames.input}[name=${key}]`); 
  };


  const getErrorElement = key => {
    return form.querySelector(`.${classNames.error}[data-key=${key}]`); 
  };


  const setError = (key, errorMessage) => {
    submitButton.setAttribute('disabled', 'disabled');

    const input = getInputElement(key);
    input.classList.add(classNames.inputInvalid);

    let error = getErrorElement(key);
    if (!error) {
      error = document.createElement('p');
      input.after(error);
    }

    error.textContent = errorMessage;
    error.classList.add(classNames.error);
    error.dataset.key = key;
  };


  const cleareError = key => {
    submitButton.removeAttribute('disabled', 'disabled');

    const input = getInputElement(key);
    input.classList.remove(classNames.inputInvalid);

    const error = getErrorElement(key);
    if (error) {
      error.remove();
    }
  };


  form.addEventListener('input', event => {
    const input = event.target;
    const key = input.name;
    const value = input.value;

    const error = validate(key, value);

    if (!error) {
      input.onblur = () => {
        input.dataset.dirty = 'true';
      };
      cleareError(key);
      return;
    }

    if (input.dataset.dirty === 'true') {
      setError(key, error);
      return;
    }

    input.onblur = () => {
      input.dataset.dirty = 'true';
      setError(key, error);
    };
  });

  form.addEventListener('submit', event => {
    const formData = new FormData(event.currentTarget);

    isFormValid = true;

    formData.forEach((value, key) => {
      const input = getInputElement(key);
      input.dataset.dirty = 'true';

      const error = validate(key, value);

      if (!error) {
        return;
      }

      setError(key, error);
      isFormValid = false;
    })

    if (!isFormValid) {
      event.preventDefault();
      return
    }
  })
};

function validateUsername(value) {
  if (!value) {
    return 'Введите имя';
  }

  if (value.length < 2) {
    return 'Имя должно быть не меньше 2 символов';
  }

  if (value.length > 40) {
    return 'Максимум 40 символов';
  }

  return null;
}

function validateUserInfo(value) {
  if (!value) {
    return 'Напишите что-то о себе';
  }

  if (value.length < 2) {
    return 'В поле не должно быть меньше 2 символов';
  }

  if (value.length > 200) {
    return 'Максимум 200 символов';
  }

  return null;
}

function validatePlaceName(value) {
  if (!value) {
    return 'Введите название места';
  }

  if (value.length < 2) {
    return 'Название не может быть меньше 2 символов';
  }

  if (value.length > 30) {
    return 'Максимум 30 символов';
  }

  return null;
}

function validatePlaceLink(value) {
  if (!value.startsWith('https://')) {
    return 'Некорректная ссылка';
  }

  return null;
}



enableValidation(addForm, validators, classNames);

enableValidation(editForm, validators, classNames);