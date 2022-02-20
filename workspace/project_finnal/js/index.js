// import các component là các trang để render chuyển đổi giữa các trang

import inforScreen from "./container/infor/infor.js";
import LoginScreen from "./container/login/login.js";
import MainScreen from "./container/main/main.js";
import verifiScreen from "./container/verifi/verifi.js";
import RegisterScreen from "./container/Register/register.js";

class App {
    $activeScreen;
    constructor() {
        this.setUpAuthListener();
    }
    setUpAuthListener(){
        const userData = localStorage.getItem("auth-info");
        firebase.auth().onAuthStateChanged((user) => {
            let screen;
            if (user && user.emailVerified) {
                if(userData) screen = new MainScreen();
                else screen = new inforScreen();

            //  screen = new LoginScreen();

            } else if (user && !user.emailVerified) {
                screen = new verifiScreen();
            } else {
              screen = new LoginScreen();
            }
            this.changeActiveScreen(screen);
          });
    }
    changeActiveScreen(screen) {
        const appEle = document.getElementById("app");
        if (appEle) {
            if (this.$activeScreen) {
                appEle.innerHTML = "";
            }
            this.$activeScreen = screen;
            screen.render(appEle);
        }
    }
}
const app = new App();
export default app;