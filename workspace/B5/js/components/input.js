class InputComponent {
  $container;
  $label;
  $containerInput;
  $input;

  $error;

  //   $name;
  //   $type;
  //   $id;

  constructor(label, name, id, type) {
    this.$container = document.createElement("div");
    this.$container.classList.add("row", "d-flex", "flex-wrap", "mt-4");

    this.$containerInput = document.createElement("div");
    this.$containerInput.classList.add("col-8");

    this.$label = document.createElement("label");
    this.$label.classList.add("col-4", "label-input");
    this.$label.innerText = label;

    this.$input = document.createElement("input");
    this.$input.classList.add("form-control");
    this.$input.type = type;
    this.$input.id = id;
    this.$input.name = name;

    this.$error = document.createElement("div");
    this.$error.classList.add("error", "mt-2", "d-none");
  }

  setError(message) {
    this.$error.innerText = message;
    this.$error.classList.remove("d-none");
    this.$error.classList.add("d-block");
  }

  render() {
    this.$container.append(this.$label, this.$containerInput);
    this.$containerInput.append(this.$input, this.$error);
    return this.$container;
  }
}

export default InputComponent;