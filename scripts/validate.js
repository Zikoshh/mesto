const validators = {
  username: validateUsername,
  userInfo: validateUserInfo,
  placeName: validatePlaceName,
  placeLink: validatePlaceLink
};

const classNames = {
  input: "popup__input",
  inputInvalid: "popup__input_invalid",
  error: "popup__error"
}

enableValidation(addForm, validators, classNames);
enableValidation(editForm, validators, classNames);

function enableValidation(form, validators, classNames) {
  const submitButton = form.querySelector(".popup__submit")
  /*return null or errorMessage*/
  const validate = (key, value) => {
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
    const inputEl = getInputElement(key);
    inputEl.classList.add(classNames.inputInvalid);

    let errorEl = getErrorElement(key);
    if (!errorEl) {
      errorEl = document.createElement('p');
      inputEl.after(errorEl);
    }

    errorEl.textContent = errorMessage;
    errorEl.classList.add(classNames.error);
    errorEl.dataset.key = key;
  };


  const cleareError = key => {
    submitButton.removeAttribute('disabled', 'disabled')
    const inputEl = getInputElement(key);
    inputEl.classList.remove(classNames.inputInvalid);

    const errorEl = getErrorElement(key);
    if (errorEl) {
      errorEl.remove();
    }
  };


  form.addEventListener("input", event => {
    const key = event.target.name;
    const value = event.target.value;

    const error = validate(key, value);

    if (!error) {
      event.target.onblur = () => {
        event.target.dataset.dirty = 'true';
      };
      cleareError(key);
      return;
    }

    if (event.target.dataset.dirty === 'true') {
      setError(key, error);
      return;
    }

    event.target.onblur = () => {
      event.target.dataset.dirty = 'true';
      setError(key, error);
    };
  });

  form.addEventListener("submit", event => {
    const formData = new FormData(event.currentTarget);
    const errorMessages = formData.querySelectorAll(".popup__error");

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

    delete errorMessages;
  })
};

function validateUsername(value) {
  if (!value) {
    return "Введите имя";
  }

  if (value.length < 2) {
    return "Имя должно быть не меньше 2 символов";
  }

  if (value.length > 40) {
    return "Максимум 40 символов";
  }

  return null;
}

function validateUserInfo(value) {
  if (!value) {
    return "Напишите что-то о себе";
  }

  if (value.length < 2) {
    return "В поле не должно быть меньше 2 символов";
  }

  if (value.length > 200) {
    return "Максимум 200 символов";
  }

  return null;
}

function validatePlaceName(value) {
  if (!value) {
    return "Введите название места";
  }

  if (value.length < 2) {
    return "Название не может быть меньше 2 символов";
  }

  if (value.length > 30) {
    return "Максимум 30 символов";
  }

  return null;
}

function validatePlaceLink(value) {
  if (!value.startsWith('https://')) {
    return "Некорректная ссылка";
  }

  return null;
}
