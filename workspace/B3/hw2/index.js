const usernameEle = document.getElementById('Họ Và Tên');
const emailEle = document.getElementById('Email');
const phoneEle = document.getElementById('Số Điện Thoại');

const btnRegister = document.getElementById('btn-register');
const inputEles = document.querySelectorAll('.input-row');

btnRegister.addEventListener('click', function () {
    Array.from(inputEles).map((ele) =>
        ele.classList.remove('success', 'error')
    );
    let isValid = checkValidate();

    if (isValid) {
        alert(' Đăng ký thành công');
    }
});

function checkValidate() {
    let usernameValue = usernameEle.value;
    let emailValue = emailEle.value;
    let phoneValue = phoneEle.value;

    let isCheck = true;

    if (usernameValue == '') {
        setError(usernameEle, 'Họ Tên Đầy Đủ');
        isCheck = false;
    } else {
        setSuccess(usernameEle);
    }

    if (emailValue == '') {
        setError(emailEle, 'Email Đầy Đủ');
        isCheck = false;
    } else if (!isEmail(emailValue)) {
        setError(emailEle, 'Email Không Đúng ');
        isCheck = false;
    } else {
        setSuccess(emailEle);
    }

    if (phoneValue == '') {
        setError(phoneEle, 'Số điện Thoại Đầy Đủ');
        isCheck = false;
    } else if (!isPhone(phoneValue)) {
        setError(phoneEle, 'Số Điện Thoại Không Đúng');
        isCheck = false;
    } else {
        setSuccess(phoneEle);
    }

    return isCheck;
}

function setSuccess(ele) {
    ele.parentNode.classList.add('success');
}

function setError(ele, message) {
    let parentEle = ele.parentNode;
    parentEle.classList.add('error');
    parentEle.querySelector('small').innerText = message;
}