import LoginScreen from "./containers/Login/index.js";
import RegisterScreen from "./containers/Register/index.js";
import CheckEmailScreen from "./containers/CheckEmail/index.js";

class App {
  //   $activeScreen;
  constructor() {}
  changeActiveScreen(screen) {
    const appEle = document.getElementById("app");
    if (appEle) {
      if (this.$activeScreen) {
        appEle.innerHTML = "";
      }
      this.$activeScreen = screen;
      appEle.appendChild(screen.render());
    }
  }
  alert() {
    this.$activeScreen.alert();
  }
}

const app = new App();
const signUp = new RegisterScreen();
const checkEmailScreen = new CheckEmailScreen();
app.changeActiveScreen(signUp);
export default app;