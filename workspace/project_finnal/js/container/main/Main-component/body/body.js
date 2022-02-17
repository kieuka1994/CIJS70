import {createPost} from "../../../firebase/store.js"
import {getCurrentUser} from "../../../firebase/auth.js"
import * as _noti from "../../../../common/notify.js"
import  post  from "./post.js";
import db from "../../../firebase/firestore.js"
class body{
    $container;

    $leftCol;
    $rightCol;
    $listPostContain;
    $userInforContain;
    $postItems;
    
    $userInfor;
    $userName;
    $userPostCount;
    $userAchive;
    $userAva;

    $chatBoxContain; 
    $btnCreate;
    $modal;
    constructor(){
        this.$container = document.createElement("div");
        this.$container.classList.add("cs-body", "d-flex");

        this.$leftCol = document.createElement("div");
        this.$leftCol.classList.add("cs-left","d-flex");

        this.$rightCol = document.createElement("div");
        this.$rightCol.classList.add("cs-right","d-flex");

        this.$listPostContain = document.createElement("div");
        this.$listPostContain.classList.add("cs-listPost","d-flex");

        this.$userInforContain = document.createElement("div");
        this.$userInforContain.classList.add("cs-uInforArea");

        // this.$container = document.createElement("div");
        // this.$container.classList.add("cs-body");

        // this.$container = document.createElement("div");
        // this.$container.classList.add("cs-body");

        this.$btnCreate = document.createElement("div");
        this.$btnCreate.classList.add("btn", "btn-primary");
        this.$btnCreate.setAttribute("data-bs-toggle", "modal");
        this.$btnCreate.setAttribute("data-bs-target", "#postModal");
        this.$btnCreate.innerText = "Create new post";

        this.renderModal();
       
        this.fetchPost();

    }
    handleUpdate =()=>{

    }
    handleDelete=()=>{

    }
    fetchPost(){
      db.collection("post").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.$postItems = new post(
            doc.data(),
            this.handleUpdate,
            this.handleDelete
          );
          this.$listPostContain.append(this.$postItems.render());
        });
    });
    }
    renderModal(){
        this.$modal = document.createElement("div");
        this.$modal.classList.add("modal", "fade");
        this.$modal.setAttribute("id", "postModal");
        this.$modal.setAttribute("tabindex", "-1");
        this.$modal.setAttribute("aria-labelledby", "postModal");
        this.$modal.setAttribute("aria-hidden", "true");

        this.$modal.innerHTML=`
        <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="postModalLabel">New post</h5>
            <button id="btn-icon-close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Message:</label>
                <textarea class="form-control" id="message-text"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
           
            <button id ="btn-createPost"type="button" class="btn btn-primary">Create Post</button>
          </div>
        </div>
      </div>
        `;
    }
    handleClose = () => {
        const postContent = document.getElementById("message-text");
       
        const btnClose = document.getElementById("btn-icon-close");
    
        postContent.value = "";
        
        btnClose.click();
    };
    handleSubmit= async()=>{
        try {
            const postContent = document.getElementById("message-text");
           
            const user = getCurrentUser();
            await createPost(
                postContent.value,
                user.email,
                "...",
                "3"
            )
            this.handleClose();
        } catch (error) {
            _noti.error(error.code, error.message);
        }
       
    }
    render(parentContainer){
        parentContainer.append(this.$container);
        this.$container.append(this.$leftCol, this.$rightCol, this.$modal);

        this.$leftCol.append(this.$btnCreate, this.$listPostContain);
        this.$rightCol.append(this.$userInforContain);

        document
        .getElementById("btn-createPost")
        .addEventListener("click", this.handleSubmit);

        document 
        .getElementById("btn-icon-close")
        .addEventListener("click", this.handleClose);
    }

}
export default body;