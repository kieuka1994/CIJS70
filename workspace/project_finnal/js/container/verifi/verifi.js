class verifiScreen {
    $verifiContain;
    constructor() {
        this.$verifiContain = document.createElement("div");
        this.$verifiContain.innerHTML = `
        <div id = "confirm-email" class="ver-contain">
        <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_nxkmi9um.json" background="transparent"
            speed="0.75" style="width: 300px; height: 300px;" loop autoplay></lottie-player>
        <p id="email-notifi">Confirm your email!</p>
        <p id="disciption">Your account has been successfully registered. To complete the process please check your
            email for a <a href="mailto:">verify</a> request.</p>
    </div>`

    }
    render(appEle) {
        appEle.appendChild(this.$verifiContain);
    }

}
export default verifiScreen;