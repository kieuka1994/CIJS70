import listPost from "./list-post.js"
import {createPost} from "../../../firebase/store.js"
import {getCurrentUser} from "../../../firebase/auth.js"
import inforModal from "./inforModal.js"
class body{
    $container;
    $userInforContain;
    $listPost;
    $leftCol;
    $rightCol;
    
    $chatBoxContain; 
    $btnCreate;
    $modal;

    $userInfor;
    $userName;
    $userPostCount;
    $userAchive;
    $userAva;
    
    constructor(){
        this.$container = document.createElement("div");
        this.$container.classList.add("cs-body", "d-flex");

        this.$leftCol = document.createElement("div");
        this.$leftCol.classList.add("cs-left","d-flex");
        this.$listPost = new listPost();

        this.$rightCol = document.createElement("div");
        this.$rightCol.classList.add("cs-right","d-flex");

        this.$btnCreate = document.createElement("div");
        this.$btnCreate.classList.add("btn", "btn-primary", "btnCreatePost");
        this.$btnCreate.setAttribute("data-bs-toggle", "modal");
        this.$btnCreate.setAttribute("data-bs-target", "#postModal");
        this.$btnCreate.innerText = "Create new post";

        const userData = JSON.parse(localStorage.getItem("auth-info"));
        this.$userInforContain = new inforModal(userData.email);
        this.$userInforContain.render().classList.remove("cs-inforModal")
        this.$userInforContain.render().classList.add("cs-uInforArea", "d-flex");


        this.renderModal();
    }
    renderModal(){
        this.$modal = document.createElement("div");
        this.$modal.classList.add("modal", "fade");
        this.$modal.setAttribute("id", "postModal");
        this.$modal.setAttribute("tabindex", "-1");
        this.$modal.setAttribute("aria-labelledby", "postModal");
        this.$modal.setAttribute("aria-hidden", "true");

        this.$modal.innerHTML=`
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="postModalLabel">New post</h5>
            <button id="btn-icon-close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
              <label for="message-text" class="col-form-label">Post Content:</label>
                <textarea class="form-control" id="message-text"></textarea>
              </div>
              <div class="mb-3">
                <label for="postImageUrl" class="col-form-label">ImageUrl:</label>
                <input class="form-control" type = "text" id="postImageUrl">
              </div>
              <div class="mb-3">
                <label for="imageFile" class="col-form-label">Or upload your file:</label>
                <input type="file" id="imageFile">
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
            const postImageUrl = document.getElementById("postImageUrl");
            const user = getCurrentUser();
            await createPost(
                postContent.value,
                postImageUrl.value,
                user.email,
                [],
                []
            )
            this.handleClose();
        } catch (error) {
            _noti.error(error.code, error.message);
        }
       
    }
    render(parentContainer){
        parentContainer.append(this.$container);
        this.$container.append(this.$leftCol, this.$rightCol, this.$modal);
        this.$leftCol.append(this.$btnCreate, this.$listPost.render());
        this.$rightCol.append(this.$userInforContain.render());
        document
        .getElementById("btn-createPost")
        .addEventListener("click", this.handleSubmit);

        document 
        .getElementById("btn-icon-close")
        .addEventListener("click", this.handleClose);
    }
}
export default body