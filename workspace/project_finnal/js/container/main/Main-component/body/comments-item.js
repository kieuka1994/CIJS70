class CommentItem {
    $container;
    $author;
    $subContainer;
    $content;
    $avatar;
    $likeCount
  
    constructor(commentData) {
      this.$container = document.createElement("div");
      this.$container.classList.add("comt-item-container", "d-flex");
  
      this.$author = document.createElement("div");
      this.$author.classList.add("author-item", "d-flex");
      this.$author.innerText = commentData.sender;
  
      this.$subContainer = document.createElement("div");
      this.$subContainer.classList.add("comt-item-sub-container", "d-flex");
  
      this.$content = document.createElement("div");
      this.$content.classList.add("content-item", "d-flex");
      this.$content.innerText = commentData.content;

      this.$likeCount = document.createElement("div");
      this.$content.classList.add("likeCount-item", "d-flex");
  
      this.$avatar = document.createElement("div");
      this.$avatar.classList.add("avatar-item", "d-flex");
      this.$avatar.style.backgroundImage = commentData.avatarSender
        ? `url(${commentData.avatarSender})`
        : `url(https://www.kindpng.com/picc/m/685-6851196_person-icon-grey-hd-png-download.png)`;
  
      if (commentData.isAuth) {
        this.$container.classList.add("comt-item-right");
        this.$content.classList.add("bgPink");
      }
    }
  
    render() {
      this.$container.append(this.$author, this.$subContainer);
  
      this.$subContainer.append(this.$avatar, this.$content);
      return this.$container;
    }
  }
  export default CommentItem;
