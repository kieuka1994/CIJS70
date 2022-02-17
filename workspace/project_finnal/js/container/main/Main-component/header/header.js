class Header{
    $container;
    $logoContainer;
    $logo;
    // $...
    $userInforContain;

    $avaUserContain;
    $avaUser;

    $userName;
    constructor(){
        this.$container = document.createElement("div");
        this.$container.classList.add("cs-header");

        this.$logoContainer = document.createElement("div");
        this.$logoContainer.classList.add();

        this.$avaUserContain = document.createElement("div");
        this.$avaUserContain.classList.add();

        this.$avaUser = document.createElement("div");
        this.$avaUser.classList.add();
        
    }
    render(parentContainer){
        parentContainer.append(this.$container);
    }
}
export default Header;