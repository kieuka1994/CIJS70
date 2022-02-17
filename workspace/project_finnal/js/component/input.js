class InputConponent {
    $container;
    $label;
    $containerInput;
    $input;
    $error;

    constructor(label, name, id, type) {

        this.$container = document.createElement("div");
        this.$container.classList.add("myInputContain");

        this.$containerInput = document.createElement("div");
        this.$containerInput.classList.add();

        this.$label = document.createElement("label");
        this.$label.innerText = label;
        this.$label.classList.add("myLabel");

        this.$input = document.createElement("input");
        this.$input.classList.add("myInput");
        this.$input.type = type;
        this.$input.id = id;
        this.$input.name = name;
        this.$input.placeholder = "Enter your " + name;

        this.$error = document.createElement("div");
        this.$error.classList.add("myError", "mt-2", "d-none");

    }
    setAttribute(name, value){
        this.$input.setAttribute(name, value);
    }
    setEventListener(event, callBackFn){
        this.$input.addEventListener(event, callBackFn);
    }
    setError(mess) {
        this.$error.innerText = mess;
        this.$error.classList.remove("d-none");
        this.$error.classList.add("d-block");
    }
    render() {
        this.$containerInput.append(this.$input, this.$error);
        this.$container.append(this.$label, this.$containerInput);
        return this.$container;
    }
}
export default InputConponent;