import Header from "./Main-component/header/header.js"
import body from "./Main-component/body/body.js";




class MainScreen{
    $container;
    $paper;
    $header;
    $body;
    $footer;
    
    constructor(){
        this.$container = document.createElement("div");
        this.$container.classList.add("main");


        this.$header = new Header();

        this.$body = new body();
       
    }
    render(appEle){
        appEle.appendChild(this.$container);
        
        this.$header.render(this.$container);
        this.$body.render(this.$container);
       
    }
}
export default MainScreen;