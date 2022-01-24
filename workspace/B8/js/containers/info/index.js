import { checkName, checkPhone } from "../../common/validation.js";
import ButtonComponent from "../../components/button.js";
import InputComponent from "../../components/input.js";
import { getCurrentUser } from "../../firebase/auth.js";
import {
  createUser,
  getUserByEmail,
  updateUser,
} from "../../firebase/store.js";
import MainScreen from "../Main/index.js";
import appContainer from "../../index.js";
import * as _noti from "../../common/notify.js";

class InfoScreen {
  $container;

  $paper;
  $avatarContainer;
  $avatar;

  $form;
  $title;
  $email;
  $name;
  $phone;
  $imageUrl;

  $btnSubmit;

  $userId;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("info-screen");

    this.$paper = document.createElement("div");
    this.$paper.classList.add("paper");

    this.$avatarContainer = document.createElement("div");
    this.$avatarContainer.classList.add("avatar-container");
    this.$avatar = document.createElement("div");
    this.$avatar.classList.add("avatar");

    this.$form = document.createElement("form");
    this.$form.classList.add("form-container");
    this.$form.addEventListener("submit", this.handleSubmit);

    this.$title = document.createElement("div");
    this.$title.classList.add("big-title");
    this.$title.innerText = "Your profile";

    const user = getCurrentUser();

    this.$email = new InputComponent(
      "Email address",
      "email",
      "info-email",
      "text"
    );

    this.$email.setAttribute("value", user.email);
    this.$email.setAttribute("disabled", true);

    this.$name = new InputComponent("Full name", "name", "info-name", "text");
    this.$phone = new InputComponent(
      "Phone number",
      "phone",
      "info-phone",
      "text"
    );
    this.$imageUrl = new InputComponent(
      "Avatar URL",
      "imageUrl",
      "info-imageUrl",
      "text"
    );

    this.$imageUrl.setEventListener("input", this.handleChangeAvatar);

    this.$btnSubmit = new ButtonComponent(
      "Continue...",
      ["btn", "btn-primary", "d-block", "mt-3"],
      "submit"
    );

    this.handleFetchUserByEmail();
  }

  async handleFetchUserByEmail() {
    const user = getCurrentUser();
    const userStore = await getUserByEmail(user.email);
    if (userStore) {
      this.$userId = userStore.id;

      this.$name.setAttribute("value", userStore.name);
      this.$phone.setAttribute("value", userStore.phone);
      this.$imageUrl.setAttribute("value", userStore.imageUrl);

      this.$avatar.style.backgroundImage = `url(${userStore.imageUrl})`;
    } else {
      this.$userId = "";
    }
  }

  handleChangeAvatar = (e) => {
    this.$avatar.style.backgroundImage = `url(${e.target.value})`;
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { name, phone, imageUrl } = e.target;
      const user = getCurrentUser();
      let isError = false;
      if (checkName(name.value)) {
        isError = true;
        this.$name.setError(checkName(name.value));
      } else {
        this.$name.setError("");
      }
      if (checkPhone(phone.value)) {
        isError = true;
        this.$phone.setError(checkPhone(phone.value));
      } else {
        this.$phone.setError("");
      }

      if (isError) {
        return;
      }

      if (this.$userId) {
        await updateUser(
          this.$userId,
          user.email,
          name.value,
          phone.value,
          imageUrl.value
        );
      } else {
        await createUser(
          user.email,
          "",
          name.value,
          phone.value,
          imageUrl.value
        );
      }

      const newMain = new MainScreen();
      appContainer.changeActiveScreen(newMain);
    } catch (error) {
      _noti.error(error.code, error.message);
    }
  };

  render(appEle) {
    appEle.appendChild(this.$container);
    this.$container.append(this.$paper);
    this.$paper.append(this.$form, this.$avatarContainer);

    this.$form.append(
      this.$title,
      this.$email.render(),
      this.$name.render(),
      this.$phone.render(),
      this.$imageUrl.render(),
      this.$btnSubmit.render()
    );

    this.$avatarContainer.appendChild(this.$avatar);
  }
}

export default InfoScreen;