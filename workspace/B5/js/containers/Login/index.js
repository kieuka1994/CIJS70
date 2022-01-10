import ButtonComponent from "../../components/button.js";
import InputComponent from "../../components/input.js";
import { checkEmail, checkPassword } from "../../common/validation.js";
import RegisterScreen from "../Register/index.js";
import app from "../../index.js";
import { loginWithEmailPass } from "../../firebase/auth.js";

class LoginScreen {
  $email;
  $password;
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
    this.$titleScreen.innerText = "Welcome back ";

    this.$link = document.createElement("a");
    this.$link.innerText = "I don't haved a account!";
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

    this.$btnSubmit = new ButtonComponent(
      "Sign in",
      ["btn", "btn-primary", "d-block", "mt-3"],
      "submit"
    );
  }

  handleChangeScreen = (e) => {
    e.preventDefault();
    const signUp = new RegisterScreen();
    app.changeActiveScreen(signUp);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    let isError = false;
    if (checkEmail(email.value) !== null) {
      // loi
      this.$email.setError(checkEmail(email.value));
      isError = true;
    } else {
      this.$email.setError("");
    }
    if (checkPassword(password.value) !== null) {
      console.log("Pwd khong hop le");
      this.$password.setError(checkPassword(password.value));
      isError = true;
    } else {
      this.$password.setError("");
    }

    if (!isError) {
      loginWithEmailPass(email.value, password.value);
    }
  };

  setLoading() {
    // this.$btnSubmit.render().innerText = "";
    // this.$btnSubmit.render().innerHTML = `<div class="loader"></div>`;
  }

  render() {
    this.$formLogin.append(
      this.$titleScreen,
      this.$email.render(),
      this.$password.render(),
      this.$btnSubmit.render(),
      this.$link
    );

    this.$container.append(this.$imageCover, this.$formLogin);
    return this.$container;
  }
}

export default LoginScreen;