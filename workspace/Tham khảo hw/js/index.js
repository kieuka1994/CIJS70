import LoginScreen from "./containers/Login/index.js";

const app = document.getElementById("app");
const loginScreen = new LoginScreen();

app.appendChild(loginScreen.render());