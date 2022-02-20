class CommemtItem {
  $container;
  $author;
  $subContainer;
  $content;
  $avatar;

  constructor(cmtData) {
    this.$container = document.createElement("div");
    this.$container.classList.add("cmt-item-container", "d-flex");

    this.$author = document.createElement("div");
    this.$author.classList.add("author-item", "d-flex");
    this.$author.innerText = cmtData.sender;

    this.$subContainer = document.createElement("div");
    this.$subContainer.classList.add("cmt-item-sub-container", "d-flex");

    this.$content = document.createElement("div");
    this.$content.classList.add("content-item", "d-flex");
    this.$content.innerText = cmtData.content;

    this.$avatar = document.createElement("div");
    this.$avatar.classList.add("avatar-item", "d-flex");
    this.$avatar.style.backgroundImage = cmtData.avaSend
      ? `url(${cmtData.avaSend})`
      : `url(https://www.kindpng.com/picc/m/685-6851196_person-icon-grey-hd-png-download.png)`;
  }

  render() {
    this.$container.append(this.$author, this.$subContainer);

    this.$subContainer.append(this.$avatar, this.$content);
    return this.$container;
  }
}
export default CommemtItem;