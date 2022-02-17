import { getCurrentUser } from "../../../firebase/auth.js";
import db from "../../../firebase/index.js";
import CommentItem from "./comments-item";

class CommentList {
  $container;
  $title;
  $listItem;

  $activeConversation;

  constructor(cons) {
    this.$activeConversation = cons;

    this.$container = document.createElement("div");
    this.$container.classList.add("comments-container", "d-flex");

    this.$title = document.createElement("div");
    this.$title.classList.add("list-title");
    this.$title.innerText = cons.name;

    this.$listItem = document.createElement("div");
    this.$listItem.classList.add("list-container", "d-flex");

    this.setUpCommentListener();
  }

  setUpCommentListener() {
    const user = getCurrentUser();
    db.collection("comments")
      .where("conversationId", "==", this.$activeConversation.id)
      .orderBy("sentAt")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docChanges());
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const comtFb = change.doc.data();
            const comtEle = new CommentItem({
              ...comtFb,
              isAuth: comtFb.sender === user.email,
            });

            this.$listItem.append(comtEle.render());
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
export default CommentList;