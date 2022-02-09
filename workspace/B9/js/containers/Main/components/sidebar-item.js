class SidebarItem {
  // Layout
  $container;
  $subContainer;
  $actionContainer;
  $popupContainer;

  $imageEle;
  $nameEle;
  $descEle;
  $btnMore;
  $btnUpdate;
  $btnDelete;
  $btnAdd;

  // Data
  $id;
  $name;
  $imageUrl;
  $desc;
  $users;
  $creator;

  $item;

  $callbackUpdate;
  $callbackDelete;
  $callbackAdd;
  $callbackActive;

  // conversation {
  //   id,
  //   name,
  //   imageUrl,
  //   users,
  //   creator
  // }

  constructor(conversation, cbAdd, cbUpdate, cbDelete, cbActive) {
    // create layout
    this.$container = document.createElement("div");
    this.$container.classList.add("cs-item", "d-flex");
    this.$container.addEventListener("mouseleave", this.hidePopup);
    this.$container.addEventListener("click", this.handleActive);

    this.$imageEle = document.createElement("div");
    this.$imageEle.classList.add("cs-avatar");

    this.$subContainer = document.createElement("div");
    this.$subContainer.classList.add("cs-sub-container");

    this.$actionContainer = document.createElement("div");
    this.$actionContainer.classList.add("cs-action-container");

    this.$nameEle = document.createElement("div");
    this.$nameEle.classList.add("cs-name");

    this.$descEle = document.createElement("div");
    this.$descEle.classList.add("cs-desc");

    this.$btnMore = document.createElement("div");
    this.$btnMore.classList.add("btn-show-more");
    this.$btnMore.addEventListener("click", this.handleToogle);

    this.$popupContainer = document.createElement("div");
    this.$popupContainer.classList.add("cs-popup");

    this.$btnUpdate = document.createElement("div");
    this.$btnUpdate.classList.add("btn-popup");
    this.$btnUpdate.innerText = "Update";
    this.$btnUpdate.addEventListener("click", this.handleUpdate);

    this.$btnAdd = document.createElement("div");
    this.$btnAdd.classList.add("btn-popup");
    this.$btnAdd.innerText = "Add user";
    this.$btnAdd.addEventListener("click", this.handleAdd);

    this.$btnDelete = document.createElement("div");
    this.$btnDelete.classList.add("btn-popup");
    this.$btnDelete.innerText = "Delete";
    this.$btnDelete.addEventListener("click", this.handleDelete);

    //  setup data
    this.setUpData(conversation, cbAdd, cbUpdate, cbDelete, cbActive);
  }

  handleUpdate = () => {
    this.$callbackUpdate(this.$item);
  };

  handleDelete = () => {
    this.$callbackDelete(this.$id, this.$name);
  };

  handleAdd = () => {
    this.$callbackAdd(this.$item);
  };

  handleActive = () => {
    this.$callbackActive(this.$item);
  };

  setUpData = (cons, cbAdd, cbUpdate, cbDelete, cbActive) => {
    this.$id = cons.id;
    this.$name = cons.name;
    this.$imageUrl = cons.imageUrl;
    this.$desc = `${cons.users.length} user(s)`;
    this.$users = cons.users;
    this.$creator = cons.creator;

    this.$item = cons;
    this.$callbackUpdate = cbUpdate;
    this.$callbackDelete = cbDelete;
    this.$callbackAdd = cbAdd;
    this.$callbackActive = cbActive;

    this.fillDataToEle();
  };

  fillDataToEle = () => {
    this.$imageEle.style.backgroundImage = `url(${this.$imageUrl})`;
    this.$nameEle.innerText = this.$name;
    this.$descEle.innerText = this.$desc;
  };

  hidePopup = () => {
    if (this.$popupContainer.classList.contains("show")) {
      this.$popupContainer.classList.remove("show");
    }
  };

  handleToogle = (e) => {
    if (this.$popupContainer.classList.contains("show")) {
      this.$popupContainer.classList.remove("show");
    } else {
      this.$popupContainer.classList.add("show");
    }
  };

  unMount = () => {
    this.$container.remove();
  };

  render() {
    this.$container.append(
      this.$imageEle,
      this.$subContainer,
      this.$actionContainer
    );

    this.$subContainer.append(this.$nameEle, this.$descEle);
    this.$actionContainer.append(this.$btnMore);
    this.$btnMore.append(this.$popupContainer);
    this.$popupContainer.append(this.$btnAdd, this.$btnUpdate, this.$btnDelete);
    return this.$container;
  }
}

export default SidebarItem;