import Composer from "./components/composer.js";
import MessageList from "./components/message-list.js";
import SidebarComponent from "./components/sidebar.js";

class MainScreen {
  $container;

  $paper;
  $sidebarComponent;

  $chatContainer;
  $messageList;
  $composer;

  $activeConversation = null;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("main", "d-flex");

    this.$paper = document.createElement("div");
    this.$paper.classList.add("chat-paper");

    this.$chatContainer = document.createElement("div");
    this.$chatContainer.classList.add("chat-container", "d-flex");

    this.$sidebarComponent = new SidebarComponent(this.setActiveConversation);
  }

  setActiveConversation = (conversation) => {
    if (
      this.$activeConversation &&
      this.$activeConversation.id === conversation.id
    ) {
      return;
    }

    this.$activeConversation = conversation;

    if (this.$messageList) {
      this.$messageList.unMout();
    }
    if (this.$composer) {
      this.$composer.unMout();
    }
    this.$chatContainer.innerHTML = "";

    this.$messageList = new MessageList(conversation);
    this.$composer = new Composer(conversation);

    this.$chatContainer.append(
      this.$messageList.render(),
      this.$composer.render()
    );
  };

  render(appEle) {
    appEle.appendChild(this.$container);

    this.$container.append(this.$paper);
    this.$sidebarComponent.render(this.$paper);
    this.$paper.append(this.$chatContainer);
  }
}

export default MainScreen;