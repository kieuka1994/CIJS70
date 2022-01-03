import Input from "../common/input.js";
class LoginUser {
  $container;
  $title;
  $link;
  $span;

  $formRegister;
  $userName;
  $password;

  $btnSubmit;
  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("containerForm");

    this.$title = document.createElement("p");
    this.$title.innerHTML = "Login";

    this.$formRegister = document.createElement("form");
    this.$formRegister.classList.add("formLogin");
    this.$formRegister.addEventListener("submit", this.handleSubmit);

    this.$userName = new Input("User Name", "text", "username");
    this.$password = new Input("Password", "password", "password");

    this.$btnSubmit = document.createElement("button");
    this.$btnSubmit.type = "submit";
    this.$btnSubmit.innerHTML = "Login";

    this.$link = document.createElement("a");
    this.$link.innerHTML = "Register";
    this.$link.target = "_blank";
    this.$link.setAttribute("href", "../SignUp/signup.html");

    this.$span = document.createElement("span");
    this.$span.innerHTML = "Not a member? ";
  }
  handleSubmit = (evt) => {
    evt.preventDefault();

    //lay giá trị nhập từ Input vào
    const username = this.$userName.getInputValue();
    const pass = this.$password.getInputValue();

    //Khai báo error cho từng Input đầu vào
    this.$userName.setErrorMsg(null);
    this.$password.setErrorMsg(null);

    var checkUserName = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g;

    if (!username) {
      this.$userName.setErrorMsg("Tên đăng nhập đầy đủ!");
      return;
    }
    if (!checkUserName.test(username)) {
      this.$userName.setErrorMsg("Tên đăng nhập không hợp lệ");
      return;
    }
    if (pass.length < 6 || pass.length == 0) {
      this.$password.setErrorMsg(
        "Mật khẩu không hợp lệ, phải khoảng hơn 6 kí tự!"
      );
      return;
    }
  };

  Render() {
    this.$formRegister.append(
      this.$title,
      this.$userName.Render(),
      this.$password.Render(),
      this.$btnSubmit,
      this.$span,
      this.$link
    );
    this.$container.append(this.$formRegister);
    return this.$container;
  }
}
export default LoginUser;