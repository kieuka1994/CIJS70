class DataFQA {
    $container;
    $btnQuestion;
    $answer;
  
    constructor(question, answer) {
      this.$container = document.createElement("div");
      this.$container.classList.add("container");
  
      this.$btnQuestion = document.createElement("button");
      this.$btnQuestion.classList.add("question");
      this.$btnQuestion.innerHTML = question;
      this.$btnQuestion.addEventListener("click", this.showAnswer);
  
      this.$answer = document.createElement("div");
      this.$answer.classList.add("panel");
      this.$answer.innerHTML = answer;
    }
    showAnswer = () => {
      this.$answer.nextElementSibling;
      if (this.$answer.style.display == "block") {
        this.$answer.style.display = "none";
        this.$btnQuestion.classList.remove("answer-active");
      } else {
        this.$answer.style.display = "block";
        this.$btnQuestion.classList.add("answer-active");
      }
    };
    render() {
      this.$container.append(this.$btnQuestion, this.$answer);
      return this.$container;
    }
  }
  export default DataFQA;