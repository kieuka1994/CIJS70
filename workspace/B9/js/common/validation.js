export const checkEmail = (email) => {
  if (!email || email.length === 0) {
    return "Email is require.";
  }
  const regex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  if (!regex.test(email)) {
    return "Email is invalid.";
  }
  return null;
};

export const checkPassword = (pwd) => {
  if (!pwd || pwd.length === 0) {
    return "Password is require.";
  }
  if (pwd.length < 8 || pwd.length > 16) {
    return "The length of password is from 8 to 16 characters.";
  }
  return null;
};

export const checkName = (name) => {
  if (!name || name.length === 0) {
    return "Name is require.";
  }
  if (name.length > 50) {
    return "Name is too long.";
  }
  return null;
};

export const checkPhone = (phone) => {
  if (!phone || phone.length === 0) {
    return "Phone number is require.";
  }
  if (phone.length !== 10) {
    return "Phone number is invalid.";
  }
  return null;
};