/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "../SignUp/SignUp.module.css";
import "../Modal/Modal.css";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Modal, Button, Image } from "react-bootstrap";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import GoogleIconLogin from "../../assets/google-logo-9808.png";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleShow = () => setShowModal(true);
  const handleCloseAll = () => setShowModal(false);
  const [eyeIcon, setEyeIcon] = useState(faEyeSlash);

  const passwordInput = document.getElementById("passwordInput");

  const handleShowPassword = () => {
    let type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    setEyeIcon(eyeIcon === faEye ? faEyeSlash : faEye);
    passwordInput.setAttribute("type", type);
  };

  const loginAccountEmail = async () => {
    handleCloseAll();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      alert("Error: email/password incorrect");
    }
  };

  const loginAccountFacebook = async () => {
    //Authentication process
    const provider = new FacebookAuthProvider();
    provider.addScope("user_birthday", "profile_pic");
    const auth = getAuth();

    //sign-in method
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

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

  const loginAccountGmail = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    //Signs in w/ google information
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <Button onClick={handleShow} className={`${styles.btn} ${styles.btnBlack}`}>
        <span>Sign in</span>
      </Button>
      <Modal
        id="passwordSet"
        size="md"
        className={styles.modalBackground}
        dialogClassName={styles.modal}
        centered
        show={showModal}
        onHide={handleCloseAll}
      >
        <div className={styles.modalBackdrop}>
          <div className={styles.modalOverride}>
            <Modal.Header
              className={styles.override}
              closeButton
              closeVariant="white"
            ></Modal.Header>
          </div>
          <Modal.Header className={styles.modalHeader}>
            <Modal.Title className={styles.modalHeader}>Welcome Back</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {/* Email */}
              <Col sm={12}>
                <div className={styles.controlGroup}>
                  <label className={styles.inputLabel} htmlFor="name">
                    Email
                  </label>
                  <input
                    id="name"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-100 mb-4 ${styles.modalInput}`}
                    type="email"
                  />
                </div>
              </Col>
              {/* Password */}
              <Col sm={12}>
                <label className={`d-block ${styles.inputLabel}`}>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  type="password"
                  id="passwordInput"
                  className={`w-100 ${styles.modalInput}`}
                />
                <i>
                  <FontAwesomeIcon
                    onClick={handleShowPassword}
                    className={styles.passwordEye}
                    icon={eyeIcon}
                  />
                </i>
              </Col>
              {/* Alternate sign in buttons */}
              <Col>
                <div className="mt-2 d-flex">
                  {/* Sign in Google*/}
                  <div className="me-3">
                    <p onClick={loginAccountGmail} className={styles.btnSwap}>
                      <span>
                        <Image src={GoogleIconLogin} className={styles.google} alt="GoogleIcon" />
                      </span>
                      Sign in with Google
                    </p>
                  </div>
                  {/* Sign in Facebook */}
                  <div className="ms-3">
                    <p onClick={loginAccountFacebook} className={styles.btnSwap}>
                      <span>
                        <FontAwesomeIcon
                          className={styles.apple}
                          style={{ verticalAlign: "top" }}
                          icon={faFacebook}
                        />
                      </span>{" "}
                      Sign in with Facebook
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <div className={styles.modalFooter}>
            <Button
              className={`${styles.modalBtn}`}
              variant="primary"
              onClick={() => {
                loginAccountEmail();
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
