class CheckEmailScreen {
  $mainContainer;
  $btnMail;
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
            <button id="open-gmail" type="button" class="btn btn-primary">Primary</button>
        </div>
        </div>
    </div>
    `;
  }
  render(appEle) {
    appEle.appendChild(this.$mainContainer);

    this.$btnMail = document.getElementById("open-gmail");
    this.$btnMail.addEventListener("click", () => {
      window.location.href = "https://mail.google.com/mail/u/0/#inbox";
    });
  }
}

export default CheckEmailScreen;