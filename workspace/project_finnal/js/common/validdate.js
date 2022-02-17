export const checkMail = (email) => {
    if (!email || email.length === 0) return "Email is require!!!";
    const regax = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    if (!regax.test(email)) return "Email is invalid!!!";
    return null;
}
export const checkPassword = (password) => {
    if (!password || password.length === 0) return "Password is require !!!";
    if (password.length < 8 || password.length > 16) return "Password must be between 8 and 16 characters !!!";
    return null;
}
export const checkComFirm = (password, confirm) => {
    if (!confirm || confirm.length === 0) return "Confirm password is require !!!";
    if (password !== confirm) return "Confirm password is not matched!!!";
    return null;
}
function removeAscent(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\s/g, "");
    return str;
}
export const checkName = (uname) => {
    if (!uname || uname.length === 0) return "User name is require!!!";
    const re = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g;
    if (!re.test(removeAscent(uname))) return "User name is invalid!!!";
    return null;
}
export const checkVNPhoneNumber = (phone)=>{
    if(!phone || phone.length === 0) return "Phone Number is require!!!";
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if(!vnf_regex.test(phone)) return "Phone Number is invalid!!!";
    return null;
}