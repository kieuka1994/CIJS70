import LoginScreen from "./containers/Login/index.js";
import RegisterScreen from "./containers/Register/index.js";
import CheckEmailScreen from "./containers/CheckEmail/index.js";
import MainScreen from "./containers/Main/index.js";
import InfoScreen from "./containers/Info/index.js";

class App {
  $activeScreen;
  constructor() {
    this.setUpAuthListener();
  }

  setUpAuthListener() {
    firebase.auth().onAuthStateChanged((user) => {
      let screen;
      if (user && user.emailVerified) {
        // :Ka remove comment and remove MainScreen
        screen = new InfoScreen();
        // screen = new MainScreen();
      } else if (user && !user.emailVerified) {
        screen = new CheckEmailScreen();
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