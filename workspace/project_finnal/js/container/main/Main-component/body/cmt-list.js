import { getCurrentUser } from "../../../firebase/auth.js";

import db from "../../../../container/firebase/firestore.js";
import CommemtItem from "./cmt-item.js";

class CommentList {

 
  $listItem;

  $activePost;

  constructor(post) {
    this.$activePost = post;

    this.$listItem = document.createElement("div");
    this.$listItem.classList.add("list-container", "d-flex");

    this.setUpCmtListener();
  }

  setUpCmtListener() {
    db.collection("comment")
      .where("postID", "==", this.$activePost.id)
      .orderBy("sendAt","desc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change.type);
          if (change.type === "added") {
            const cmtFb = change.doc.data();
            const cmtEle = new CommemtItem({
              ...cmtFb
            });

            this.$listItem.append(cmtEle.render());
          }
        });
      });
  }

  // unMout = () => {
  //   this.$container.remove();
  // };

  render() {
    return this.$listItem;
  }
}
export default CommentList;