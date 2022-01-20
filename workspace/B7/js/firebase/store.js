import db from "./index.js";
import * as _noti from "../common/notify.js";

async function createUser(email, password, name, phone, imageUrl) {
  try {
    const response = await db.collection("users").add({
      email,
      password,
      name,
      phone,
      imageUrl,
    });
    console.log(response);
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    _noti.error(errorCode, errorMessage);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const querySnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (querySnapshot.docs.length === 0) {
      return null;
    }

    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    _noti.error(errorCode, errorMessage);
    throw error;
  }
}

async function updateUser(uid, email, name, phone, imageUrl) {
  try {
    const response = await db.collection("users").doc(uid).update({
      email,
      name,
      phone,
      imageUrl,
    });
    console.log(response);
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

async function createConverstaion(name, imageUrl, desc, users, email) {
  try {
    const response = await db.collection("conversations").add({
      name,
      imageUrl,
      description: desc,
      users,
      createdBy: email,
    });
    console.log(response);
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

export { createUser, getUserByEmail, updateUser, createConverstaion };