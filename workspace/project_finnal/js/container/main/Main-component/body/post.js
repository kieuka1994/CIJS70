import {getUserByEmail} from "../../../firebase/store.js"



class post {
    $container;
    $inforArea;
    $postContentArea;
    $userAva;
    $inforModal;
    $userName;
    $contentEle;

    $lcContain;
    $likeCount;
    $cmtCount;

    $listComment;
    $btnlike;
    $commentArea;
    $cmtInput;
    $cmtbtn;

    // data
    $id;
    $author;
    $content;
    $likes;
    $listCmt;
    $cmts;

    $item;

    $callbackUpdate;
    $callbackDelete;

    constructor(post, cbUpdate, cbDelete) {

        this.$inforArea = document.createElement("div");
        this.$inforArea.classList.add("cs-postInfor", "d-flex","line");

        this.$postContentArea = document.createElement("div");
        this.$postContentArea.classList.add("cs-contentArea", "d-flex");

        this.$container = document.createElement("div");
        this.$container.classList.add("cs-postContain");

        this.$userAva = document.createElement("div");
        this.$userAva.classList.add("cs-postAva");

        this.$lcContain = document.createElement("div");
        this.$lcContain.classList.add("lc-show", "d-flex","line");


        this.$userName = document.createElement("div");

        this.$contentEle = document.createElement("p");
        this.$contentEle.classList.add("cs-content");
       

        this.$likeCount = document.createElement("div");
        this.$likeCount.classList.add("likeCount");


        this.$cmtCount = document.createElement("div");
        this.$cmtCount.classList.add("cmtCount");
        

        this.$btnlike = document.createElement("div");
        this.$btnlike.classList.add("like");
        this.$btnlike.innerText = "like";

        this.$listCmt = document.createElement("div");
        this.$listCmt.classList.add();

        this.$commentArea = document.createElement("div");
        this.$commentArea.classList.add("cs-cmtContain", "d-flex")

        this.setUpData(post, cbUpdate, cbDelete);

    }
    setUpData = (post, cbUpdate, cbDelete) => {
        this.$id = post.id;
        this.$author = post.author;
        this.$content = post.content;
        this.$likes = post.likeCount;
        this.$cmts = post.comments;

        this.$item = post;
        this.$callbackUpdate = cbUpdate;
        this.$callbackDelete = cbDelete;

        this.fillDataToEle(post);
    }
    fillDataToEle = async(post)=> {
        const authorData = await getUserByEmail(this.$author);

        this.$userAva.style.backgroundImage = `url(${authorData.imageUrl})`;
        this.$userName.innerText = authorData.name;
        this.$contentEle.innerText = post.content;
        this.$likeCount.innerHTML = `<ion-icon  name="heart-circle-outline"></ion-icon> ${post.likeCount}`;
        this.$cmtCount.innerText = post.comments + " comment";

    }
    render() {
        this.$container.append(this.$inforArea, this.$postContentArea);
        this.$inforArea.append(this.$userAva, this.$userName, this.$inforModal);
        this.$postContentArea.append(this.$contentEle, this.$lcContain, this.$commentArea);
        this.$lcContain.append(this.$likeCount, this.$cmtCount);
        this.$commentArea.append(this.$btnlike)
        return this.$container;
    }
}
export default post;