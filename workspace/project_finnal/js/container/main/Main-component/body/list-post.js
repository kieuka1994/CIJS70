import {addUserLikedByEmail, removeUserUnLiked} from "../../../firebase/store.js"
import {getCurrentUser} from "../../../firebase/auth.js"
import * as _noti from "../../../../common/notify.js"
import  post  from "./post.js";
import db from "../../../firebase/firestore.js"
class listPost{
  
    $listPostContain;
 
    $postItems;
    
    $objItems={};

    constructor(){
       
        this.$listPostContain = document.createElement("div");
        this.$listPostContain.classList.add("cs-listPost","d-flex");

        this.fetchPost();
        this.setUpPostListener();

    }
    handleUpdate =()=>{

    }
    handleDelete=()=>{

    }
    handleLike = async (liked, post)=>{
      try {
      const userLike = getCurrentUser(); 
        
      if(liked === true){
          await addUserLikedByEmail(post, userLike.email);
      }
      else if(liked === false){
          await removeUserUnLiked(post, userLike.email);
      }
      } catch (error) {
        _noti.error(error.code, error.message);
      }
      
    }
    
    handleCmt=()=>{

    }
    setUpPostListener() {
      
      db.collection("post")
        .where("author", "!=", null)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
           
            if (change.type === "modified") {
              console.log(change.type);
              if (this.$objItems[change.doc.id]) {
                this.$objItems[change.doc.id].setUpData(
                  {
                    ...change.doc.data(),
                    id: change.doc.id,
                  },
                  this.handleUpdate,
                  this.handleDelete,
                  this.handleLike,
                  this.handleCmt
                
                );
              }
            }
            if (change.type === "removed") {
              this.$objItems[change.doc.id].unMount();
            }
          });
        });
    }
    fetchPost(){
      db.collection("post").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const newPost = {
            ...doc.data(),
            id: doc.id,
          };
         const addedPost = new post(
            newPost,
            this.handleUpdate,
            this.handleDelete,
            this.handleLike,
            this.handleCmt
          );
          this.$objItems[doc.id] = addedPost;
          this.$listPostContain.append(addedPost.render());
        });
    });
    }
  
    render(){
      return this.$listPostContain;              
    }

}
export default listPost;