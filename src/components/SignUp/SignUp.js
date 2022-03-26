/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import Login from "../Login/Login";
import { Row, Col, Button, Image } from "react-bootstrap";
import Logo from "../UI/Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import ModalSignUp from "../Modal/ModalSignUp/ModalSignUp";
import GoogleIcon from "../../assets/google-logo-9808.png";
import {
  signOut,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import defaultPicture from "../../assets/home-bg.png";
import { collection, doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [defaultPic, setDefaultPic] = useState(defaultPicture);

  const logout = async () => {
    await signOut(auth);
  };

  const createAccountFacebook = async () => {
    //Authentication process
    const provider = new FacebookAuthProvider();
    provider.addScope("user_birthday", "profile_pic");
    const auth = getAuth();

    //sign-in method
    signInWithRedirect(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        const usersRef = collection(db, "users");

        setDoc(doc(usersRef, user.uid), {
          userID: user.uid,
          name: user.displayName,
          username: user.displayName,
          likedTweets: [],
          retweetedTweets: [],
          commentedTweets: [],
          email: user.email,
          profilePicture: user.photoURL + "?type=large&access_token=" + accessToken,
        }).then((result) => {
          console.log(doc.id);
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const createAccountGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a google access token. You can use this to access the google api
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        //The signed-in user info
        const user = result.user;

        const usersRef = collection(db, "users");

        setDoc(doc(usersRef, user.uid), {
          userID: user.uid,
          name: user.displayName,
          likedTweets: [],
          retweetedTweets: [],
          commentedTweets: [],
          username: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
        });
      })
      .catch((error) => {
        //Handle errors here
        const errorCode = error.code;
        const errorMessage = error.message;

        //email of user which recieved error
        const email = error.email;

        //the AuthCredential type that was used
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  // const getDocs = async () => {
    // const docRef = doc(db, "users", auth.currentUser.uid);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.containerExtraPadding}>
        <Row
          className={`${styles.fitContent} w-100 d-flex justify-content-center align-items-center`}
        >
          <Row>
            <Col>
              <Logo style={`${styles.logo} ${styles.marginBtm}`} height />
              <div className={`${styles.header} ${styles.colorWhite} ${styles.marginBtm}`}>
                Happening now
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className={`${styles.subHeader} ${styles.colorWhite}`}>Join Twitter today.</h2>
              <div className={styles.signUp}>
                {/* Sign up btn Google*/}
                <div>
                  <Button
                    onClick={createAccountGoogle}
                    className={`${styles.btn} ${styles.btnWhite} ${styles.btnGoogle}`}
                  >
                    <span>
                      <Image src={GoogleIcon} className={styles.google} alt="GoogleIcon" />
                    </span>
                    Sign up with Google
                  </Button>
                </div>
                {/* Sign up btn Apple */}
                <div>
                  <Button
                    onClick={createAccountFacebook}
                    className={`${styles.btn} ${styles.btnGoogle} ${styles.btnWhite}`}
                  >
                    <span>
                      <FontAwesomeIcon
                        style={{ color: "blue" }}
                        className={styles.apple}
                        icon={faFacebook}
                      />
                    </span>{" "}
                    Sign up with Facebook
                  </Button>
                </div>
                <div>
                  <div>
                    <p className={`${styles.colorWhite}  ${styles.borders}`}>
                      <span>or</span>
                    </p>
                  </div>
                  {/* Sign up btn email / phone */}
                  <div>
                    <ModalSignUp />
                    <p className={`${styles.colorWhite} ${styles.agreement}`}>
                      By signing up, you agree to the Terms of Service and Privacy Policy, including
                      Cookie Use.
                    </p>
                  </div>
                  {/* <div>
                    <Button onClick={logout} variant="danger">
                      Logout
                    </Button>
                  </div> */}
                </div>
              </div>
            </Col>
            <Row>
              <Col>
                <div className={styles.login}>
                  <h5 className={`${styles.loginSubHeader} ${styles.colorWhite}`}>
                    Already have an account?
                  </h5>
                  <div>
                    <Login />
                  </div>
                </div>
              </Col>
            </Row>
          </Row>
        </Row>
      </div>

      {/* 
      Last thing is now here! */}
    </div>
  );
};

export default SignUp;
