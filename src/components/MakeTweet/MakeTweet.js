import React, { useEffect, useState } from "react";
import styles from "./MakeTweet.module.css";
import { Col, Row, Button, Image } from "react-bootstrap";
import stars from "../../assets/timeline-stars.png";
import defaultPicture from "../../assets/defaultPicture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../State/StateProvider/StateProvider";
import { collection, doc, setDoc, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const MakeTweet = ({ data }) => {
  const [tweet, setTweet] = useState("");
  const [uploadFile, setUploadFile] = useState([]);
  const [charCount, setCharCount] = useState();
  const [{ userDocs }] = useStateValue();
  const [profilePic, setProfilePic] = useState();
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState();
  const [key, setKey] = useState();

  const chooseFile = (e) => {
    const file = e.target.files[0];
    return handleTweetUploadFile(file);
  };

  const countChar = () => {
    let textbox = document.getElementById("createTweetInput").value;
    textbox.length === 0 ? setCharCount(false) : setCharCount(280 - textbox.length);
  };

  const handleGetTweet = (e) => {
    countChar();
    setTweet(e.target.value);
  };

  //uploads file to firebase Storage
  const handleTweetUploadFile = (file) => {
    if (!file) return console.log("no go bro");
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setFileName(file.name);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        progress === 100
          ? alert(`image uploaded at: ${progress}%`)
          : alert("please wait until image is finished loading.");
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setUploadFile(url));
      }
    );
  };

  const randomId = () => {
    let idOne = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "");
    let idTwo = Math.floor(Math.random() * 100);
    let idThree = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "");
    setKey(`${idOne}${idTwo}${idThree}`);
  };

  const handleSendTweet = async (e) => {
    e.preventDefault();

    randomId();
    console.log("key:", key);

    let tweetDate = new Date();

    //gathers current user and creates a collection
    const q = query(collection(db, "users"), where("userID", "==", userDocs.userID));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));

    //creates collection for main group of tweets
    await setDoc(doc(db, "tweets", `${key}`), {
      tweet: tweet,
      image: uploadFile ? uploadFile : "",
      date: tweetDate,
      likes: 0,
      profilePicture: userDocs.profilePicture,
      username: userDocs.username,
      userID: userDocs.userID,
      retweets: 0,
      commentCount: 0,
      tweetID: `${key}`,
    });

    //creates the new collection of tweets for user collection.
    queryData.map(async (v) => {
      await setDoc(doc(db, `users/${v.id}/tweets`, `${key}`), {
        tweet: tweet,
        image: uploadFile ? uploadFile : "",
        date: tweetDate,
        likes: 0,
        profilePicture: userDocs.profilePicture,
        username: userDocs.username,
        userID: userDocs.userID,
        retweets: 0,
        commentCount: 0,
        tweetID: `${key}`,
      });
    });
    document.getElementById("createTweetInput").value = "";
    setFileName("");
  };

  useEffect(() => {
    userDocs ? setProfilePic(userDocs.profilePicture) : setProfilePic(defaultPicture);
    randomId();
  }, [userDocs]);

  return (
    <div>
      <Row>
        <Col className={`${styles.border} ${styles.container}`}>
          <h2 className={styles.homeHeader}>Home</h2>
          <Image fluid className={styles.stars} src={stars} alt="timeline-stars" />
        </Col>
      </Row>
      <Row>
        <Col className={styles.borderBtm}>
          <form>
            <div className={styles.textbox}>
              <Image className={styles.profilePicture} src={profilePic} alt="profile-picture" />
              <textarea
                className={styles.textboxTweet}
                id="createTweetInput"
                maxLength={280}
                onChange={handleGetTweet}
                type="textbox"
                placeholder="What's happening?"
              />
              {charCount ? <p className={styles.characterCount}>{charCount}</p> : ""}
            </div>
            <div className={styles.tweetBtns}>
              <div className={styles.tweetOption}>
                <div className="d-flex mt-2">
                  <input
                    type="file"
                    onChange={(e) => chooseFile(e)}
                    id="imageInput"
                    style={{ display: "none" }}
                  />
                  <FontAwesomeIcon
                    onClick={(e) => document.getElementById("imageInput").click(e)}
                    icon={faImage}
                  />
                  <p className={styles.fileName}>{fileName}</p>
                </div>
              </div>
              <Button
                type="submit"
                onClick={handleSendTweet}
                className={`${styles.btnBlue} ${styles.btn}`}
              >
                Tweet
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default MakeTweet;
