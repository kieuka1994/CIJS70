class SidebarItem {
  $container;

  $imageUrl;

  $subContainer;
  $title;
  $description;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("cs-item", "d-flex");

    this.$container.innerText = "Chat Với Nhau Đi Mấy Ba Mấy Má ";
  }

  render() {
    return this.$container;
  }
}

export default SidebarItem;