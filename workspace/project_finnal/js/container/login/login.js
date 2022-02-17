import ButtonComponent from "../../component/button.js";
import InputConponent from "../../component/input.js"
import { checkMail, checkPassword } from "../../common/validdate.js"
import RegisterScreen from "../Register/register.js";
import app from "../../index.js";
import { loginAccount } from "../firebase/auth.js"
import MainScreen from "../main/main.js";
class LoginScreen {
    $email;
    $password;
    $container;

    $formLogin;
    $btnSubmit;
    $titleScreen;
    $linkContian;
    $link;

    constructor() {
        this.$container = document.createElement("div");
        this.$container.classList.add("login-form", "d-flex");

        this.$formLogin = document.createElement("form");
        this.$formLogin.classList.add("login-container");
        this.$formLogin.addEventListener("submit", this.handleSubmit);


        this.$titleScreen = document.createElement("div");
        this.$titleScreen.classList.add("big-title");
        this.$titleScreen.innerText = "Welcome back!";


        this.$linkContian = document.createElement("div");
        this.$linkContian.innerText = "Not a member? ";
        this.$linkContian.classList.add("mt-4", "text-white");

        this.$link = document.createElement("a");
        this.$link.innerText = "Register";
        this.$link.addEventListener("click", this.changeScreen);
        this.$linkContian.appendChild(this.$link);

        this.$email = new InputConponent(
            "Email address",
            "email",
            "login-email",
            "email"
        );
        this.$password = new InputConponent(
            "Password",
            "password",
            "login-password",
            "password"
        );
        this.$btnSubmit = new ButtonComponent(
            "Sign In",
            ["btn", "btn-primary"],
            "submit"
        );


    }
    changeScreen = (e) => {
        e.preventDefault();
        const register = new RegisterScreen();
        app.changeActiveScreen(register);

    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        let isError = false;
        if (checkMail(email.value) !== null) {
            isError = true;
            this.$email.setError(checkMail(email.value));
        }
        else this.$email.setError("");

        if (checkPassword(password.value) !== null) {
            isError = true;
            this.$password.setError(checkPassword(password.value));
        }
        else this.$password.setError("");

        if (!isError) {
           const userLogin = await loginAccount(email.value, password.value);
           const mainScreen = new MainScreen();
           app.changeActiveScreen(mainScreen);
        }
    }
    render(appEle) {
        this.$formLogin.append(
            this.$titleScreen,
            this.$email.render(),
            this.$password.render(),
            this.$btnSubmit.render(),
            this.$linkContian
        );
        this.$container.append(this.$formLogin);
        appEle.appendChild(this.$container);
    }

}
export default LoginScreen