import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDocs, collection, where, query } from "firebase/firestore";
// require("dotenv").config();



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

//make sure you're pulling from the data layer. If you cannot import useStateValue it will NOT work

//Get all of one kind. Could be used for tweets

// const getAllEmails = async () => {

//      Change this portion for what you are searching for
//   const q = query(collection(db, "users"), where("email", "==", user.email));

//   const querySnapshot = await getDocs(q);
//   let arrayQuerySnapshot = [];
//   querySnapshot.forEach((doc) => {
//     arrayQuerySnapshot.push({
//       data: doc.data(),
//     });
//   });
//   arrayQuerySnapshot = arrayQuerySnapshot.filter((users) => {
//     return users.data.userID === user?.uid;
//   });
// };

// Will gather all docs on indiv user based on who is logged in

// const getUserDocs = async () => {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   let arrayQuerySnapshot = [];
//   querySnapshot.forEach((doc) => {
//     arrayQuerySnapshot.push({
//       data: doc.data(),
//     });
//   });
//   arrayQuerySnapshot = arrayQuerySnapshot.filter((users) => {
//     return users.data.userID === user?.uid;
//   });

//   return arrayQuerySnapshot;
// };

//gathers all docs on all users

// const getAllDocs = async () => {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   let arrayQuerySnapshot = [];
//   querySnapshot.forEach((doc) => {
//     arrayQuerySnapshot.push({
//       data: doc.data(),
//     });
//   });
//   return arrayQuerySnapshot;
// };

//uploads file to firebase storage

// const handleTweetUploadFile = (file) => {
//   if (!file) return console.log("no go bro");
//   const storageRef = ref(storage, `/files/${file.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, file);

//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//       setProgress(prog);
//     },
//     (err) => console.log(err),
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((url) => setUploadFile(url));
//     }
//   );
// };

// gathers all tweets for indiv user

export const getAllUserTweets = async (user) => {
  let arrayQuerySnapshot = [];

  const querySnapshot = await getDocs(collection(db, `users/${user.userID}/tweets`));
  querySnapshot.forEach((doc) => {
    arrayQuerySnapshot.push(doc.data());
  });

  return arrayQuerySnapshot;
};

export const getAllUserLikedTweets = async (user) => {
  let arrayQuerySnapshot = [];
  let likedID = user.likedTweets;

  likedID.map(async (tweetID) => {
    const q = query(collection(db, "tweets"), where("tweetID", "==", `${tweetID}`));

    const querySnapshot = await getDocs(q);

    // const querySnapshot = getDocs(collection(db, `tweets/${query}`));
    return querySnapshot.forEach((doc) => {
      // console.log("This is my data:", doc.data());
      arrayQuerySnapshot.push(doc.data());
    });
  });

  return arrayQuerySnapshot;
};

export const getTweetComments = async (tweetID) => {
  let arrayQuerySnapshot = [];
  // let commentArray = []

  const q = query(collection(db, "tweets"), where("tweetID", "==", `${tweetID}`));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // console.log("this is my data:", doc.data());
    arrayQuerySnapshot.push(doc.data());
  });
  return arrayQuerySnapshot;
};
