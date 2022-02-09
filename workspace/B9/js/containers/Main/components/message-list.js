import { getCurrentUser } from "../../../firebase/auth.js";
import db from "../../../firebase/index.js";
import MessageItem from "./message-item.js";

class MessageList {
  $container;
  $title;
  $listItem;

  $activeConversation;

  constructor(cons) {
    this.$activeConversation = cons;

    this.$container = document.createElement("div");
    this.$container.classList.add("message-container", "d-flex");

    this.$title = document.createElement("div");
    this.$title.classList.add("list-title");
    this.$title.innerText = cons.name;

    this.$listItem = document.createElement("div");
    this.$listItem.classList.add("list-container", "d-flex");

    this.setUpMessageListener();
  }

  setUpMessageListener() {
    const user = getCurrentUser();
    db.collection("messages")
      .where("conversationId", "==", this.$activeConversation.id)
      .orderBy("sentAt")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docChanges());
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const msgFb = change.doc.data();
            const msgEle = new MessageItem({
              ...msgFb,
              isAuth: msgFb.sender === user.email,
            });

            this.$listItem.append(msgEle.render());
          }
        });
      });
  }

  unMout = () => {
    this.$container.remove();
  };

  render() {
    this.$container.append(this.$title, this.$listItem);
    return this.$container;
  }
}
export default MessageList;