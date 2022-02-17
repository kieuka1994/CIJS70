import db from "./firestore.js";
import * as _noti from "../../common/notify.js";


async function createUser(email, name, phone, imageUrl) {
    try {
        const response = await db.collection("users").add({
            email,
            name,
            phone,
            imageUrl,
        });
        localStorage.removeItem("auth-info");
        localStorage.setItem("auth-info", JSON.stringify({
            email,
            name,
            phone,
            imageUrl
        }));
        console.log(response);

    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage);
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
            id:querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
        }
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error;
    }
}

async function updateUserData( uid, email, name, phone, imageUrl) {
    try {
        const reponse = await db
            .collection("users")
            .doc(uid)
            .update({
                email,
                name,
                phone,
                imageUrl,
            });
            localStorage.removeItem("auth-info");
            localStorage.setItem("auth-info", JSON.stringify({
                email,
                name,
                phone,
                imageUrl
            }));
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error;
    }
}
async function createPost(content, author, comments, likeCount){
    try {
        const reponse = await db.collection("post").add({
            content,
            author,
            comments,
            likeCount,
            updateAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error; 
    }
}


async function deleteChat(id){
    try {
        await db.collection("chat").doc(id).delete();
        
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error;
    }
}
async function updateChat(id, name, imageUrl, users, email){
    try {
        const reponse = await db.collection("chat").doc(id).update({
            name,
            imageUrl,
            users,
            creator:email,
            updateAt: new Date().getTime()
        })
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error; 
    }
}
async function addUserByEmail(chat, newEmail){
    try {
        const reponse = await db
            .collection("chat")
            .doc(chat.id)
            .update({
                ...chat,
                users:[...chat.users, newEmail],
                updateAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error;
    }
}
async function confirmAddUser(chat){
    try {
       const result = await Swal.fire({
            title: 'Submit your email',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            preConfirm: async (email) => {
             const user = await getUserByEmail(email);
             return user;
            },
            allowOutsideClick: () => !Swal.isLoading()
          })
          console.log(result);
          if (result.value){
              console.log(result.value);
              const {email} = result.value;
              const reponse = await addUserByEmail(chat, email);
          } else{
              _noti.error("Oops...", "Your email is inexit!");
              return null;
          }
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error;
    }
}
async function sendMessage (sender, content, convID, imgUrl){
    try {
        const reponse = await db.collection("message").add({
            sender, 
            content, 
            convID,
            sendAt: firebase.firestore.FieldValue.serverTimestamp(),
            avaSend: imgUrl
        });
        console.log(reponse);
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
    updateUserData, 
    createPost, 
    updateChat, 
    deleteChat,
    confirmAddUser,
    sendMessage,
} 