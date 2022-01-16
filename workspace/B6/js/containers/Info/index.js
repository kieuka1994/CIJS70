import ButtonComponent from "../../components/button.js";
import InputComponent from "../../components/input.js";
import { getCurrentUser } from "../../firebase/auth.js";
import { createUser, getUserByEmail } from "../../firebase/store.js";

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

  $existUser;

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
      this.$existUser = true;

      this.$name.setAttribute("value", userStore.name);
      this.$phone.setAttribute("value", userStore.phone);
      this.$imageUrl.setAttribute("value", userStore.imageUrl);

      this.$avatar.style.backgroundImage = `url(${userStore.imageUrl})`;
    } else {
      this.$existUser = false;
    }
  }

  handleChangeAvatar = (e) => {
    this.$avatar.style.backgroundImage = `url(${e.target.value})`;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, imageUrl } = e.target;
    const user = getCurrentUser();
    createUser(user.email, "", name.value, phone.value, imageUrl.value);
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