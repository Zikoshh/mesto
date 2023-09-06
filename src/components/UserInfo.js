export default class UserInfo {
  constructor({ userName, aboutUser, userAvatar }) {
    this._userName = userName;
    this._aboutUser = aboutUser;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      aboutUser: this._aboutUser.textContent,
      userAvatar: this._userAvatar.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    console.log(name, about, avatar)

    this._userName.textContent = name;
    this._aboutUser.textContent = about;
    this._userAvatar.src = avatar;
  }
}