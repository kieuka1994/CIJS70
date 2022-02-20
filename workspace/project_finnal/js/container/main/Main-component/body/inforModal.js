import { getCurrentUser } from "../../../firebase/auth.js";
import {getUserByEmail} from "../../../firebase/store.js"

class inforModal{
    $container;
    $avaContain;
    $avaUrl;
    $subContain;
    $name;
    $likes;
    $posts;
    $cmts;
    constructor(email){
        
        this.$container =document.createElement("div");
        this.$container.classList.add("cs-inforModal");

        this.$avaContain =document.createElement("div");
        this.$avaContain.classList.add("cs-avaModal");
       

        this.$subContain =document.createElement("div");
        this.$subContain.classList.add("cs-subModal");

        this.$name =document.createElement("div");
        this.$name.classList.add("cs-name");
       
        this.$likes =document.createElement("div");
       
        // this.$posts =document.createElement("div");
        this.$cmts =document.createElement("div");

        this.fillUserData(email);
    }
    fillUserData = async(email)=>{
       
        const userData= await getUserByEmail(email);
        this.$avaContain.style.backgroundImage = `url(${userData.imageUrl})`;
        this.$name.innerText= userData.name;
        this.$likes.innerText= "Like: "+ userData.likeList.length;
        this.$cmts.innerText= "Post: "+ userData.cmtList.length;

    }
    render(){
        this.$container.append(this.$avaContain, this.$subContain);
        this.$subContain.append(this.$name, this.$likes, this.$cmts);
        return this.$container;

    }
}
export default inforModal;