import SidebarComponent from "./components/sidebar.js";

class MainScreen {
  $container;

  $paper;
  $sidebarComponent;
  $chatComponent;
  $informationComponent;
  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("main", "d-flex");

    this.$paper = document.createElement("div");
    this.$paper.classList.add("chat-paper");

    this.$sidebarComponent = new SidebarComponent();
  }
  render(appEle) {
    appEle.appendChild(this.$container);

    this.$container.append(this.$paper);
    this.$sidebarComponent.render(this.$paper);
  }
}

export default MainScreen;