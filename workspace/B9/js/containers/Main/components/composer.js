import ButtonComponent from "../../../components/button.js";
import * as _noti from "../../../common/notify.js";
import { sendMessage } from "../../../firebase/store.js";
import { getCurrentUser } from "../../../firebase/auth.js";

class Composer {
  $container;
  $inputMessage;
  $btnSend;

  $activeConversation;

  constructor(cons) {
    this.$container = document.createElement("form");
    this.$container.classList.add("composer-container", "d-flex");
    this.$container.addEventListener("submit", this.handleSendMessage);

    this.$inputMessage = document.createElement("input");
    this.$inputMessage.type = "text";
    this.$inputMessage.placeholder = "Please be nice in the chat...";
    this.$inputMessage.classList.add("grow-1");
    this.$inputMessage.name = "contentMsg";

    this.$btnSend = new ButtonComponent(
      "Send",
      ["btn", "btn-primary", "d-block"],
      "submit"
    );

    this.$activeConversation = cons;
  }

  unMout = () => {
    this.$container.remove();
  };

  handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      if (this.$activeConversation) {
        const { value } = event.target.contentMsg;
        const user = getCurrentUser();
        const info = JSON.parse(localStorage.getItem("auth-info"));
        this.$inputMessage.value = "";
        await sendMessage(
          user.email,
          value,
          this.$activeConversation.id,
          info.imageUrl || ""
        );
      }
    } catch (error) {
      _noti.error(error.code, error.message);
    }
  };

  render() {
    this.$container.append(this.$inputMessage, this.$btnSend.render());
    return this.$container;
  }
}

export default Composer;