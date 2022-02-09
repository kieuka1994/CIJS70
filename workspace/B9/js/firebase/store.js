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
    localStorage.removeItem("auth-info");
    localStorage.setItem(
      "auth-info",
      JSON.stringify({
        email,
        name,
        phone,
        imageUrl,
      })
    );
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
    localStorage.removeItem("auth-info");
    localStorage.setItem(
      "auth-info",
      JSON.stringify({
        email,
        name,
        phone,
        imageUrl,
      })
    );
    console.log(response);
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

async function createConverstaion(name, imageUrl, users, email) {
  try {
    const response = await db.collection("conversations").add({
      name,
      imageUrl,
      users,
      creator: email,
      updatedAt: new Date().getTime(),
    });
    console.log(response);
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

async function updateConversation(id, name, imageUrl, users, email) {
  try {
    const response = await db.collection("conversations").doc(id).update({
      name,
      imageUrl,
      users,
      creator: email,
      updatedAt: new Date().getTime(),
    });
    console.log(response);
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

async function deleteConversation(id) {
  try {
    const response = await db.collection("conversations").doc(id).delete();
    console.log(response);
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

async function addUserByEmail(conversation, newEmail) {
  try {
    const response = await db
      .collection("conversations")
      .doc(conversation.id)
      .update({
        ...conversation,
        users: [...conversation.users, newEmail],
        updatedAt: new Date().getTime(),
      });
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

async function confirmAddUserByEmail(conversation) {
  try {
    const result = await Swal.fire({
      title: "Submit your email...",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Add",
      showLoaderOnConfirm: true,
      preConfirm: async (email) => {
        const user = await getUserByEmail(email);
        return user;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (result.value) {
      const { email } = result.value;
      const respose = await addUserByEmail(conversation, email);
    } else {
      _noti.error("Opss...", "Your email is inexist!");
      return null;
    }
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

async function sendMessage(sender, content, conversationId, imgUrl) {
  try {
    const response = await db.collection("messages").add({
      sender,
      content,
      conversationId,
      sentAt: firebase.firestore.FieldValue.serverTimestamp(),
      avatarSender: imgUrl,
    });
    console.log(response);
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

export {
  createUser,
  getUserByEmail,
  updateUser,
  createConverstaion,
  updateConversation,
  deleteConversation,
  addUserByEmail,
  confirmAddUserByEmail,
  sendMessage,
};