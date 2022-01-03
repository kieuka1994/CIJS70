import LoginUser from "./login.js";
const app = document.getElementById("app");
const login = new LoginUser();
app.appendChild(login.Render());