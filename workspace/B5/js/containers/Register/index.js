import ButtonComponent from "../../components/button.js";
import InputComponent from "../../components/input.js";
import { checkEmail, checkPassword } from "../../common/validation.js";
import LoginScreen from "../Login/index.js";
import CheckEmailScreen from "../CheckEmail/index.js";
import app from "../../index.js";
import { createNewAccout } from "../../firebase/auth.js";

class RegisterScreen {
  $email;
  $password;
  $rePassword;
  $container;
  $link;

  $imageCover;
  $formLogin;
  $btnSubmit;
  $titleScreen;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("login-form", "d-flex");

    this.$imageCover = document.createElement("div");
    this.$imageCover.classList.add("img-cover");

    this.$formLogin = document.createElement("form");
    this.$formLogin.classList.add("form-container");
    this.$formLogin.addEventListener("submit", this.handleSubmit);

    this.$titleScreen = document.createElement("div");
    this.$titleScreen.classList.add("big-title");
    this.$titleScreen.innerText = "Create new account";

    this.$link = document.createElement("a");
    this.$link.innerText = "I haved a account!";
    this.$link.classList.add("d-block", "link");
    this.$link.addEventListener("click", this.handleChangeScreen);

    this.$email = new InputComponent(
      "Email address",
      "email",
      "login-email",
      "email"
    );
    this.$password = new InputComponent(
      "Password",
      "password",
      "login-password",
      "password"
    );

    this.$rePassword = new InputComponent(
      "Retype Password",
      "rePassword",
      "rePassword",
      "password"
    );

    this.$btnSubmit = new ButtonComponent(
      "Create",
      ["btn", "btn-primary", "d-block", "mt-3"],
      "submit"
    );
  }

  handleChangeScreen = (e) => {
    e.preventDefault();
    const login = new LoginScreen();
    app.changeActiveScreen(login);
  };

  setLoading() {
    this.$btnSubmit.render().innerText = "";
    this.$btnSubmit.render().innerHTML = `<div class="loader"></div>`;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, rePassword } = e.target;
    let isError = false;
    if (checkEmail(email.value) !== null) {
      // loi
      this.$email.setError(checkEmail(email.value));
      isError = true;
    } else {
      this.$email.setError("");
    }

    if (checkPassword(password.value) !== null) {
      this.$password.setError(checkPassword(password.value));
      isError = true;
    } else {
      this.$password.setError("");
    }

    if (checkPassword(rePassword.value) !== null) {
      this.$rePassword.setError(checkPassword(password.value));
      isError = true;
    } else if (password.value !== rePassword.value) {
      this.$rePassword.setError("Your re-password is not matching.");
      isError = true;
    } else {
      this.$rePassword.setError("");
    }

    if (!isError) {
      this.setLoading();
      await createNewAccout(email.value, password.value);
      const checkEmailScreen = new CheckEmailScreen();
      app.changeActiveScreen(checkEmailScreen);
    }
  };

  render() {
    this.$formLogin.append(
      this.$titleScreen,
      this.$email.render(),
      this.$password.render(),
      this.$rePassword.render(),
      this.$btnSubmit.render(),
      this.$link
    );

    this.$container.append(this.$imageCover, this.$formLogin);
    return this.$container;
  }
}

export default RegisterScreen;