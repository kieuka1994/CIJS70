class Input {
    $Container;
    $Input;
    $ErrorMsg;
    constructor(label, type, name) {
      this.$Container = document.createElement("div");
      this.$Container.classList.add("container");
  
      this.$Input = document.createElement("input");
      this.$Input.type = type;
      this.$Input.placeholder = label;
      this.$Input.name = name;
      this.$Input.addEventListener("mouseover", this.inputMouseover);
      this.$Input.addEventListener("mouseout", this.inputMouseout);
      this.$ErrorMsg = document.createElement("div");
      this.$ErrorMsg.classList.add("error-message");
    }
    inputMouseover = () => {
      this.$Input.classList.add("focus");
    };
    inputMouseout = () => {
      this.$Input.classList.remove("focus");
    };
    getInputValue = () => {
      return this.$Input.value;
    };
    setInputValue = (newValue) => {
      this.$Input.value = newValue;
    };
    setErrorMsg = (errorMess) => {
      if (errorMess) {
        this.$ErrorMsg.innerHTML = "*" + errorMess;
        this.$ErrorMsg.classList.add("has-error");
      } else {
        this.$ErrorMsg.innerHTML = "";
        this.$ErrorMsg.classList.remove("has-error");
      }
    };
    Render() {
      this.$Container.append(this.$Input, this.$ErrorMsg);
      return this.$Container;
    }
  }
  export default Input;