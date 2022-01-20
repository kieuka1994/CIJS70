import SidebarItem from "./sidebar-item.js";
import { checkName } from "../../../common/validation.js";
import * as _noti from "../../../common/notify.js";
import { createConverstaion } from "../../../firebase/store.js";
import { getCurrentUser } from "../../../firebase/auth.js";

class SidebarComponent {
  $container;

  $title;
  $btnCreate;
  $listContainer;
  $listItems;

  $modal;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("sibar-container", "d-flex");

    this.$title = document.createElement("div");
    this.$title.classList.add("sidebar-title");
    this.$title.innerText = "Chat App - CI70";

    this.$btnCreate = document.createElement("div");
    this.$btnCreate.classList.add("btn-create");
    this.$btnCreate.setAttribute("data-bs-toggle", "modal");
    this.$btnCreate.setAttribute("data-bs-target", "#conversationModal");
    this.$btnCreate.innerText = "+";

    this.$listContainer = document.createElement("div");
    this.$listContainer.classList.add("cs-list");

    this.$listItems = new Array(10)
      .fill(1)
      .map((i) => new SidebarItem().render());

    this.renderModal();
  }

  renderModal() {
    this.$modal = document.createElement("div");
    this.$modal.classList.add("modal", "fade");
    this.$modal.setAttribute("id", "conversationModal");
    this.$modal.setAttribute("tabindex", "-1");
    this.$modal.setAttribute("aria-labelledby", "conversationModal");
    this.$modal.setAttribute("aria-hidden", "true");

    this.$modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
          <h5 class="modal-title" id="modalTittle">Create new conversation</h5>
          <button id="btn-icon-close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <div class="title">
            Name<span class="caution">*</span>
          </div>
          <div class="input-group mb-3">
              <input id="name-conversation" type="text" class="form-control modal-input " placeholder="New conversation" aria-label="new_conversation" aria-describedby="basic-addon1">
          </div>
          <div class="title">
            Image url
          </div>
          <div class="input-group mb-3">
              <input id="img-conversation" type="text" class="form-control modal-input " placeholder="Avatar..." aria-label="new_conversation" aria-describedby="basic-addon1">
          </div>
          </div>
          <button id="btn-close-modal" type="button" class="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
          <div class="modal-footer" id="modal-footer">
              <button id="btn-create-converstation" type="button" class=" btn-linear">Save changes</button>
          </div>
      </div>
    </div>
    `;
  }

  handleClose = () => {
    const name = document.getElementById("name-conversation");
    const imageURL = document.getElementById("img-conversation");
    const btnClose = document.getElementById("btn-icon-close");

    name.value = "";
    imageURL.value = "";
    btnClose.click();
  };

  handleCreate = async () => {
    try {
      const name = document.getElementById("name-conversation");
      const imageURL = document.getElementById("img-conversation");
      const user = getCurrentUser();
      console.log(name.value, imageURL.value);
      if (checkName(name.value)) {
        _noti.warning("Conversation name", checkName(name.value));
        return;
      }
      await createConverstaion(
        name.value,
        imageURL.value,
        "DESC",
        [user.email],
        user.email
      );
      this.handleClose();
    } catch (error) {
      _noti.error(error.code, error.message);
    }
  };

  render(parentContainer) {
    parentContainer.append(this.$container);
    this.$container.append(
      this.$title,
      this.$btnCreate,
      this.$listContainer,
      this.$modal
    );
    this.$listContainer.append(...this.$listItems);

    document
      .getElementById("btn-create-converstation")
      .addEventListener("click", this.handleCreate);

    document
      .getElementById("btn-icon-close")
      .addEventListener("click", this.handleClose);
  }
}

export default SidebarComponent;