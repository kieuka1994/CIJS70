class SidebarItem {
  $container;

  $imageUrl;
  $roomAva;
  $chatName;

  $subContainer;
  $title;
  $description;

  $chatId;

  constructor() {
    



    this.$container = document.createElement("div");
    this.$container.classList.add("cs-item", "d-flex")
    
    this.$imageContainer = document.createElement("div");
    this.$imageContainer.classList.add("image-Url");

    this.$roomAva = document.createElement("div");
    this.$roomAva.classList.add("roomAva");

    this.$subContainer = document.createElement("div");
    this.$subContainer.classList.add("sub-container");

    this.$container.innerText = "Chat Với Nhau Đi";
  }

  render() {
    return this.$container;
  }
}

export default SidebarItem;