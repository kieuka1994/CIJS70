class CheckEmailScreen {
    $mainContainer;
    constructor() {
      this.$mainContainer = document.createElement("div");
      this.$mainContainer.innerHTML = `
      <div class="forny-inner">
          <div class="d-flex flex-column align-items-center mail">
          <div class="col-12">
              <div class="text-center">
              <lottie-player
                  src="https://assets8.lottiefiles.com/packages/lf20_se3w0ukg.json"
                  background="transparent"
                  speed="1"
                  style="width: 300px; height: 300px; margin: auto"
                  loop
                  autoplay
              ></lottie-player>
              </div>
          </div>
          <div class="col-5 text-center mail">
              <h1>Confirm your email!</h1>
              <p>
              Your Account have been suscessfully regitered. To complete the
              process, please check your email for a validation request
              </p>
              <p>
              If you wait it too long. You can
              <a href="mailto:" class="link">click here</a> to login
              </p>
          </div>
          </div>
      </div>
      `;
    }
    render() {
      return this.$mainContainer;
    }
  }
  
  export default CheckEmailScreen;