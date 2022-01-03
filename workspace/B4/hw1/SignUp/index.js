import Register from "./signUp.js";
const app = document.getElementById("app");
const signUp = new Register();
app.appendChild(signUp.Render());