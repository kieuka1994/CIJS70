import ButtonComponent from "../../components/button.js";
import InputComponent from "../../components/input.js";
import { checkEmail, checkPassword } from "../../common/validation.js";

class LoginScreen {
  $email;
  $password;
  $container;

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

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    let isError = false;
    if (checkEmail(email.value) !== null) {
      // loi
      this.$email.setError(checkEmail(email.value));
      isError = true;
    }
    if (checkPassword(password.value) !== null) {
      console.log("Pwd khong hop le");
      this.$password.setError(checkPassword(password.value));
      isError = true;
    }

    if (!isError) {
      console.log("Dang nhap thanh cong");
    }
  };

  render() {
    this.$formLogin.append(
      this.$titleScreen,
      this.$email.render(),
      this.$password.render(),
      this.$btnSubmit.render()
    );

    this.$container.append(this.$imageCover, this.$formLogin);
    return this.$container;
  }
}

export default LoginScreen;