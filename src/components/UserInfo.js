export default class UserInfo {
  constructor({ userName, aboutUser }) {
    this._userName = document.querySelector(userName);
    this._aboutUser = document.querySelector(aboutUser);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      aboutUser: this._aboutUser.textContent
    };
  }

  setUserInfo(inputValues) {
    this._userName.textContent = inputValues.userName;
    this._aboutUser.textContent = inputValues.aboutUser;
  }
}