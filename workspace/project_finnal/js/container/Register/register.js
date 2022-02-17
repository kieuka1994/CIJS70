import ButtonComponent from "../../component/button.js";
import InputConponent from "../../component/input.js"
import { checkComFirm, checkMail, checkName, checkPassword } from "../../common/validdate.js"
import LoginScreen from "../login/login.js";
import app from "../../index.js";
import verifiScreen from "../verifi/verifi.js";
import { createNewAccount } from "../firebase/auth.js";


class RegisterScreen {
    $email;
    $password;
    $confirmPwd;
    $uname;
    $container;

    $formRegister;
    $btnSubmit;
    $titleScreen;
    $linkContian;
    $link;
    $successFlag;
    constructor() {

        this.$container = document.createElement("div");
        this.$container.classList.add("login-form", "d-flex");

        this.$formRegister = document.createElement("form");
        this.$formRegister.classList.add("register-container");
        this.$formRegister.addEventListener("submit", this.handleSubmit);


        this.$titleScreen = document.createElement("div");
        this.$titleScreen.classList.add("big-title");
        this.$titleScreen.innerText = "Welcome!";

        this.$linkContian = document.createElement("div");
        this.$linkContian.innerText = "I am already a member ";
        this.$linkContian.classList.add("mt-4", "text-white");

        this.$link = document.createElement("a");
        this.$link.innerText = "Login";
        this.$link.addEventListener("click", this.changeScreen);

        this.$linkContian.appendChild(this.$link);

        this.$email = new InputConponent(
            "Email address",
            "email",
            "register-email",
            "email"
        );
        this.$uname = new InputConponent(
            "User name",
            "uname",
            "register-name",
            "text"
        );

        this.$password = new InputConponent(
            "Password",
            "password",
            "register-password",
            "password"
        );
        this.$confirmPwd = new InputConponent(
            "Confirm password",
            "confirm",
            "confirm-password",
            "password"
        );

        this.$btnSubmit = new ButtonComponent(
            "Sign Up",
            ["btn", "btn-primary"],
            "submit"
        );


    }
    changeScreen = (e) => {
        e.preventDefault();
        const login = new LoginScreen();
        app.changeActiveScreen(login);

    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, uname, password, confirm } = e.target;
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
        if (checkName(uname.value) !== null) {
            isError = true;
            this.$uname.setError(checkName(uname.value));
        }
        else this.$uname.setError("");

        if (checkComFirm(password.value, confirm.value) !== null) {
            isError = true;
            this.$confirmPwd.setError(checkComFirm(password.value, confirm.value));
        }
        else this.$confirmPwd.setError("");

        if (!isError) {
            this.setLoading();
            await createNewAccount(email.value, password.value);
            const verify = new verifiScreen();
            app.changeActiveScreen(verify);
        }
    }
    setLoading() {
        this.$btnSubmit.render().innerText = "";
        this.$btnSubmit.render().innerHTML = `<div class="loader"></div>`;
    }
    render(appEle) {
        this.$formRegister.append(
            this.$titleScreen,
            this.$email.render(),
            this.$uname.render(),
            this.$password.render(),
            this.$confirmPwd.render(),
            this.$btnSubmit.render(),
            this.$linkContian
        );
        this.$container.append(this.$formRegister);
        appEle.appendChild(this.$container);
    }

}
export default RegisterScreen