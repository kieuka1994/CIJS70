class ButtonComponent {
    $btn;
    constructor(text, classlist, type, callback) {
        this.$btn = document.createElement("button");
        this.$btn.type = type;
        this.$btn.innerText = text;
        this.$btn.classList.add(...classlist);
        if (callback) {
            this.$btn.addEventListener("click", callback);
        }
        
    }
    render() {
        return this.$btn;
    }
}
export default ButtonComponent;