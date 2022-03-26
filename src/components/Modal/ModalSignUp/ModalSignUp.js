import React, { useState, useEffect } from "react";
import "../Modal.css";
import Logo from "../../UI/Logo/Logo";
import styles from "../../SignUp/SignUp.module.css";
import { Row, Col, Button, Image, Modal } from "react-bootstrap";
import defaultPicture from "../../../assets/defaultPicture.png";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { storage } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ModalSignUp = () => {
  const [name, setName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [checkConditions, setCheckConditions] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(faEyeSlash);
  const [profilePicture, setProfilePicture] = useState(defaultPicture);
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const handleShow5 = () => setShow5(true);

  const handleShowPassword = () => {
    const passwordInput = document.getElementById("passwordInput");
    let type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    setEyeIcon(eyeIcon === faEye ? faEyeSlash : faEye);
    passwordInput.setAttribute("type", type);
  };

  const handleCloseAll = () => {
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
    setShow5(false);
  };

  const chooseFile = (e) => {
    const file = e.target.files[0];
    return uploadFile(file);
  };

  //uploads file to firebase Storage
  const uploadFile = (file) => {
    if (!file) return console.log("no go bro");
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setProfilePicture(url));
      }
    );
  };

  const createAccountEmail = async () => {
    handleCloseAll();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      //updates current fields in user
      updateProfile(auth.currentUser, { displayName: name, photoURL: profilePicture });

      const usersRef = collection(db, "users");

      setDoc(doc(usersRef, auth.currentUser.uid), {
        userID: auth.currentUser.uid,
        name: name,
        likedTweets: [],
        retweetedTweets: [],
        commentedTweets: [],
        username: username,
        email: auth.currentUser.email,
        profilePicture: profilePicture,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    name && email.length >= 5 && date ? setCheckConditions(true) : setCheckConditions(false);
    password.length >= 8 ? setCheckPassword(true) : setCheckPassword(false);
  }, [name, email, date, password]);

  return (
    <div>
      {/* Modal step 1 */}
      <Button onClick={handleShow} className={`${styles.btn} ${styles.btnBlue}`}>
        Sign up with email
      </Button>
      <Modal
        id="nameEmailPhone"
        size="md"
        className={styles.modalBackground}
        dialogClassName={styles.modal}
        centered
        show={show}
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
          <Logo style={styles.logoModal} />
          <Modal.Header className={styles.modalHeader}>
            <Modal.Title className={styles.modalHeader}>Create your account</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-inline-block position-relative">
            <Row>
              <Col sm={12}>
                <div className={styles.controlGroup}>
                  <label className={styles.inputLabel} htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    placeholder={name || "Name"}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-100 mb-4 ${styles.modalInput}`}
                    type="text"
                  />
                </div>
              </Col>
              <Col sm={12}>
                <div className={styles.controlGroup}>
                  <div>
                    <label className={styles.inputLabel} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={email || "Email"}
                      type="email"
                      className={`w-100 ${styles.modalInput}`}
                    />
                  </div>
                </div>
              </Col>

              <Col sm={12}>
                <p className={`mt-4 ${styles.modalDate}`}>Date of birth</p>
                <p className={`mb-3 ${styles.modalInfo}`}>
                  This will not be shown publicly. Confirm your own age, even if this account is for
                  a business, a pet, or something else.
                </p>
              </Col>
              <Col sm={12}>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  data-date-inline-picker="true"
                  placeholder={date || "Date of birth"}
                  className={`w-100 ${styles.modalInput}`}
                />
              </Col>
            </Row>
          </Modal.Body>
          <div className={styles.modalFooter}>
            <Button
              disabled={!checkConditions}
              className={`${styles.modalBtn}`}
              variant="primary"
              onClick={() => {
                return handleClose() & handleShow2();
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal step 2 */}
      <Modal
        id="customize"
        size="md"
        className={styles.modalBackground}
        dialogClassName={styles.modal}
        centered
        show={show2}
        onHide={handleCloseAll}
      >
        <div className={styles.modalBackdrop}>
          <div className={styles.modalOverride}>
            <Modal.Header className={styles.modalHeader}>
              <FontAwesomeIcon
                className={styles.modalArrowIcon}
                onClick={() => {
                  return handleClose2 & handleShow();
                }}
                icon={faAngleLeft}
              />
              <Modal.Title className={styles.modalSteps}>Step 2 of 5</Modal.Title>
            </Modal.Header>
          </div>
          <Modal.Body>
            <h4 className={`mb-5 ${styles.modalSubHeader}`}>Customize your experience</h4>
            <h4 className={`mt-5 ${styles.modalSubHeader}`}>
              Track where you see Twitter content across the web
            </h4>
            <div className="d-flex mb-5 justify-content-between">
              <p className={`mb-5 ${styles.modalSideInfo} ${styles.modalInfo}`}>
                Twitter uses this data to personalize your experience. This web browsing history
                will never be stored with your name, or email.
              </p>
              <input type="checkbox" />
            </div>
            <Col className="mt-5">
              <div className="mt-5">
                <p className={` ${styles.marginTop} ${styles.modalInfo}`}>
                  By signing up, you agree to our Terms, Privacy Policy, and Cookie Use. FakeTwitter
                  may use your contact information{" "}
                  <strong>(we won't this is just a copy of the twitter terms)</strong>, including
                  your email address for purposes outlined in our Privacy Policy.{" "}
                  <strong>Again, we will not use this in any way whatsoever.</strong>
                </p>
              </div>
            </Col>
          </Modal.Body>
          <div className={styles.modalFooter}>
            <Button
              className={`${styles.modalBtn}`}
              variant="primary"
              onClick={() => {
                return handleClose2() & handleShow3();
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal step 3 */}
      <Modal
        id="infoCheck"
        size="md"
        className={styles.modalBackground}
        dialogClassName={styles.modal}
        centered
        show={show3}
        onHide={handleCloseAll}
      >
        <div className={styles.modalBackdrop}>
          <div className={styles.modalOverride}>
            <Modal.Header className={styles.modalHeader}>
              <FontAwesomeIcon
                className={styles.modalArrowIcon}
                onClick={() => {
                  return handleClose3 & handleShow2();
                }}
                icon={faAngleLeft}
              />
              <Modal.Title className={styles.modalSteps}>Step 3 of 5</Modal.Title>
            </Modal.Header>
          </div>
          <Modal.Header className={styles.modalHeader}>
            <Modal.Title className={styles.modalHeader}>Create your account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              <Col sm={12}>
                <div className={styles.controlGroup}>
                  <label className={styles.inputLabel} htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder={name || "Name"}
                    className={`w-100 mb-4 ${styles.modalInput}`}
                    type="text"
                  />
                </div>
              </Col>
            </Col>
            <Col>
              <div className={styles.controlGroup}>
                <div>
                  <label className={styles.inputLabel} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={email || "Email"}
                    type="email"
                    className={`w-100 mb-5 ${styles.modalInput}`}
                  ></input>
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <label className={`d-block ${styles.inputLabel}`}>Date of birth</label>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  placeholder={date || "Date of birth"}
                  className={`w-100 ${styles.modalInput}`}
                />
              </div>
            </Col>
            <p className={`mt-4 ${styles.modalInfo}`}>
              By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie
              Use. FakeTwitter may NOT do a single thing with any of your information, enjoy your
              account!
            </p>
          </Modal.Body>
          <div className={styles.modalFooter}>
            <Button
              className={`${styles.modalBtn}`}
              variant="primary"
              onClick={() => {
                return handleClose3() & handleShow4();
              }}
            >
              Create Account
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal step 4 */}
      <Modal
        size="md"
        className={styles.modalBackground}
        dialogClassName={styles.modal}
        centered
        show={show4}
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
          <Logo style={styles.logoModal} />
          <Modal.Header className={styles.modalHeader}>
            <Modal.Title className={styles.modalHeader}> You'll need a password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className={` ${styles.colorWhite} ${styles.modalSideInfo}`}>
              Make sure that it's 8 characters or more.
            </p>
            <label className={`d-block ${styles.inputLabel}`}>Password</label>
            <input
              type="password"
              id="passwordInput"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className={`w-100 ${styles.modalInput}`}
            />
            <i>
              <FontAwesomeIcon
                onClick={handleShowPassword}
                className={styles.passwordEye}
                icon={eyeIcon}
              />
            </i>
          </Modal.Body>
          <div className={styles.modalFooter}>
            <Button
              disabled={!checkPassword}
              className={`${styles.modalBtn}`}
              variant="primary"
              onClick={() => {
                return handleClose4() & handleShow5();
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal Step 5 */}
      <Modal
        id="passwordSet"
        size="md"
        className={styles.modalBackground}
        dialogClassName={styles.modal}
        centered
        show={show5}
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
            <Modal.Title className={styles.modalHeader}>Some final touches</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.profilePicture}>
              <Image
                fluid
                src={profilePicture}
                className={styles.SetProfilePicture}
                alt="Profile picture"
              />
            </div>
            <div className={styles.profilePicture}>
              <input id="fileOpen" onChange={(e) => chooseFile(e)} type="file" />
            </div>
            <Row>
              <Col sm={12}>
                <p className={` mt-3 ${styles.modalInfo}`}>
                  If no profile picture is provided, a default value of above will be rendered as
                  your profile picture.
                </p>
              </Col>
              <Col sm={12}>
                <div className={styles.controlGroup}>
                  <label className={`mt-4 ${styles.inputLabel}`}>Pick username</label>
                  <input
                    placeholder="@"
                    className={`w-100 ${styles.modalInput}`}
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <div className={styles.modalFooter}>
            <Button
              className={`${styles.modalBtn}`}
              variant="primary"
              onClick={() => {
                createAccountEmail();
              }}
            >
              Finish Creating Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalSignUp;
