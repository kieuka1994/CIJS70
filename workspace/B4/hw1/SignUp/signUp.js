import Input from "../Common/input.js";
class Register {
  $container;
  $title;
  $link;
  $span;

  $formRegister;
  $userName;
  $email;
  $password;
  $confimPassword;

  $btnSubmit;
  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("containerForm");

    this.$title = document.createElement("p");
    this.$title.innerHTML = "Sign Up";

    this.$formRegister = document.createElement("form");
    this.$formRegister.classList.add("formSignUp");
    this.$formRegister.addEventListener("submit", this.handleSubmit);

    this.$userName = new Input("User Name", "text", "username");
    this.$email = new Input("Email", "text", "email");
    this.$password = new Input("Password", "password", "password");
    this.$confimPassword = new Input(
      "ConfimPassword",
      "password",
      "confimPass"
    );
    this.$btnSubmit = document.createElement("button");
    this.$btnSubmit.type = "submit";
    this.$btnSubmit.innerHTML = "Register";

    this.$link = document.createElement("a");
    this.$link.innerHTML = "Login";
    this.$link.target = "_blank";
    this.$link.setAttribute("href", "../Login/login.html");

    this.$span = document.createElement("span");
    this.$span.innerHTML = "I agree all staternents in ternns of severvice ? ";
  }
  handleSubmit = (evt) => {
    evt.preventDefault();

    //lay giá trị nhập từ Input vào
    const username = this.$userName.getInputValue();
    const email = this.$email.getInputValue();
    const pass = this.$password.getInputValue();
    const confimPass = this.$confimPassword.getInputValue();

    //Khai báo error cho từng Input đầu vào
    this.$userName.setErrorMsg(null);
    this.$email.setErrorMsg(null);
    this.$password.setErrorMsg(null);
    this.$confimPassword.setErrorMsg(null);

    var checkEmail =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var checkUserName = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g;

    if (!username) {
      this.$userName.setErrorMsg("Tên đăng nhập đầy đủ")
    }
    if (!checkUserName.test(username)) {
      this.$userName.setErrorMsg("Tên đăng nhập không hợp lệ");
      return;
    }

    if (!email) {
      this.$email.setErrorMsg("Email thông tin đầy đủ!");
      return;
    }
    if (!checkEmail.test(email)) {
      this.$email.setErrorMsg("Hãy nhập email hợp lệ.\nExample@gmail.com");
      return;
    }
    if (pass.length < 6 || pass.length == 0) {
      this.$password.setErrorMsg(
        "Mật khẩu không hợp lệ, phải  khoảng lớn hơn 6 kí tự!"
      );
      return;
    }
    if (pass != confimPass) {
      this.$confimPassword.setErrorMsg("Mật khẩu chưa chùng  khớp");
      return;
    }
  };
  usernameKeypress = () => {
    alert("nhan");
  };
  Render() {
    this.$formRegister.append(
      this.$title,
      this.$userName.Render(),
      this.$email.Render(),
      this.$password.Render(),
      this.$confimPassword.Render(),
      this.$btnSubmit,
      this.$span,
      this.$link
    );
    this.$container.append(this.$formRegister);
    return this.$container;
  }
}
export default Register;