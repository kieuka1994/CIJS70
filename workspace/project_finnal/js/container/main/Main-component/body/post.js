import { getCurrentUser } from "../../../firebase/auth.js";
import { getUserByEmail } from "../../../firebase/store.js"
import Composer from "./composer.js"
import db from "../../../../container/firebase/firestore.js";
import CommemtItem from "./cmt-item.js";
class Post {
    $container;
    $inforArea;
    $postContentArea;
    $userAva;
    $inforModal;
    $userName;
    $contentEle;
    $imgEle;

    $lcContain;
    $likeCount;
    $cmtCount;

    $listComment;
    $listItem;
    $btnlike;
    $commentArea;
    $actionArea;
    $cmtInput;
    $cmtbtn;
    $likeimg;
    $liked;

    // data
    $id;
    $author;
    $content;
    $likes;
    $listCmt;
    $cmts;
    $imgPost;

    $item;

    $callbackUpdate;
    $callbackDelete;
    $callbackLike;
    $callbackComment;


    constructor(post, cbUpdate, cbDelete, cbLike, cbCmt) {

        this.$container = document.createElement("div");
        this.$container.classList.add("cs-postContain");

        // author infor 
        this.$inforArea = document.createElement("div");
        this.$inforArea.classList.add("cs-postInfor", "d-flex");


        this.$userAva = document.createElement("div");
        this.$userAva.classList.add("cs-postAva");


        this.$userName = document.createElement("div");

        // post 
        this.$postContentArea = document.createElement("div");
        this.$postContentArea.classList.add("cs-contentArea", "d-flex");

        this.$contentEle = document.createElement("p");
        this.$contentEle.classList.add("cs-content");
        this.$imgEle = document.createElement("div");
        // show likeCount, cmtCount
        this.$lcContain = document.createElement("div");
        this.$lcContain.classList.add("lc-show", "d-flex");

        this.$likeCount = document.createElement("div");
        this.$likeCount.classList.add("likeCount");

        this.$cmtCount = document.createElement("div");
        this.$cmtCount.classList.add("cmtCount");

        // like and comment;
        this.$actionArea = document.createElement("div");
        this.$actionArea.classList.add("cs-actionArea", "d-flex");

        this.$btnlike = document.createElement("div");
        this.$btnlike.classList.add("btn-like");
        this.$btnlike.addEventListener("click", this.handleLike);

        this.$likeimg = document.createElement("div")
        this.$likeimg.classList.add("like-img");
        this.$btnlike.append(this.$likeimg);


        this.$commentArea = new Composer(post, cbCmt);
        this.$listCmt = document.createElement("div");
        this.$listCmt.classList.add("list-container", "d-flex");
        this.setUpCmtListener(post);
        // comment list


        this.setUpData(post, cbUpdate, cbDelete, cbLike, cbCmt);
        // like and unlike
        this.$liked = this.checkLiked();
        if (this.$liked) this.$likeimg.style.backgroundImage = `url("https://img.icons8.com/ios-filled/50/000000/facebook-like.png")`;
        else this.$likeimg.style.backgroundImage = `url("https://img.icons8.com/ios/50/000000/facebook-like--v1.png")`;
    }
    checkLiked = () => {
        const user = getCurrentUser();
        if (this.$item.likedList.includes(user.email)) return true;
        return false;
    }
    handleLike = () => {
        if (this.$liked === false) {
            this.$likeimg.style.backgroundImage = `url("https://img.icons8.com/ios-filled/50/000000/facebook-like.png")`;
            this.$liked = true;
            this.$callbackLike(this.$liked, this.$item);

        }
        else if (this.$liked === true) {
            this.$likeimg.style.backgroundImage = `url("https://img.icons8.com/ios/50/000000/facebook-like--v1.png")`;
            this.$liked = false;
            this.$callbackLike(this.$liked, this.$item);
        }
    }
    handleComment = () => {

    }
    setUpCmtListener(post) {
        db.collection("comment")
            .where("postID", "==", post.id)
            .orderBy("sendAt", "desc")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    console.log(change.type);
                    if (change.type === "added") {
                        const cmtFb = change.doc.data();
                        const cmtEle = new CommemtItem({
                            ...cmtFb
                        });

                        this.$listCmt.append(cmtEle.render());
                    }
                });
            });
    }
    setUpData = (post, cbUpdate, cbDelete, cbLike, cbCmt) => {
        this.$id = post.id;
        this.$author = post.author;
        this.$content = post.content;
        this.$likes = post.likedList.length;
        this.$cmts = post.cmtList.length;
        this.$imgPost = post.imgUrl;

        this.$item = post;
        this.$callbackUpdate = cbUpdate;
        this.$callbackDelete = cbDelete;
        this.$callbackLike = cbLike;
        this.$callbackComment = cbCmt;

        this.fillDataToEle(post);
        // console.log(post);
    }
    fillDataToEle = async (post) => {
        const authorData = await getUserByEmail(this.$author);

        this.$userAva.style.backgroundImage = `url(${authorData.imageUrl})`;
        this.$userName.innerText = authorData.name;
        if (this.$imgPost) {
            this.$imgEle.classList.add("cs-postImg");
            this.$imgEle.style.backgroundImage = `url(${this.$imgPost})`;
        }
        this.$contentEle.innerText = post.content;
        this.$likeCount.innerHTML = `<img class="likeIcon"src="https://img.icons8.com/external-others-iconmarket/64/000000/external-like-social-media-others-iconmarket-3.png"/> ${post.likedList.length}`;
        this.$cmtCount.innerText = post.cmtList.length + " comment";

    }

    render() {
        this.$container.append(this.$inforArea, this.$postContentArea, this.$listCmt);
        this.$inforArea.append(this.$userAva, this.$userName);
        this.$postContentArea.append(this.$contentEle, this.$imgEle, this.$lcContain, this.$actionArea);
        this.$lcContain.append(this.$likeCount, this.$cmtCount);
        this.$actionArea.append(this.$btnlike, this.$commentArea.render())
        return this.$container;
    }
}
export default Post;