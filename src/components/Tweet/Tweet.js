import React, { useEffect, useState } from "react";
import "../Modal/Modal.css";
import styles from "./Tweet.module.css";
import ModalStyles from "../SignUp/SignUp.module.css";
import { Row, Col, Image, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import defaultPicture from "../../assets/defaultPicture.png";
import { doc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import { useStateValue } from "../State/StateProvider/StateProvider";
// import ModalComment from "../Modal/ModalComments/ModalComment";

const Tweet = ({
  image,
  username,
  profilePicture,
  tweet,
  unixDate,
  name,
  likes,
  comments,
  retweets,
  tweetID,
  priorLikes,
}) => {
  const [likeCount, setLikeCount] = useState(0);
  const [imageShow, setImageShow] = useState(false);
  const [retweetCount, setRetweetCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
  const [retweetActive, setRetweetActive] = useState(false);
  const [commentActive, setCommentActive] = useState(false);
  // const [userLiked, setUserLiked] = useState();
  const [{ user }] = useStateValue();

  const [show, setShow] = useState(false);
  const [commentShow, setCommentShow] = useState(false);

  // const handleCommentShow = () => setCommentShow(true);
  const handleClose = () => setShow(false);
  const handleCommentClose = () => setCommentShow(false);
  const handleShow = () => setShow(true);

  // console.log("This tweet", tweetID, "is", alreadyLiked);
  // console.log(priorLikes?.map((likeID) => likeID.tweetID));

  // console.log(`my, ${tweetID} prior like is equal ${priorLikes} `);

  const handleClick = (clickType) => {
    if (clickType === "like") {
      setLikeActive(!likeActive);
    } else if (clickType === "retweet") {
      setRetweetActive(!retweetActive);
    } else if (clickType === "comment") {
      setCommentActive(!commentActive);
      setCommentShow(true);
    } else {
      console.log(clickType);
      console.log("no types found");
    }
  };

  // console.log(userDocs);

  const unixTime = unixDate;
  const newDate = unixTime?.toDate();

  const timeSetter = () => {
    const timeSubtract = Math.abs(new Date() - new Date(newDate));

    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const padDigits = (num) => {
      return num.toString().padStart(2);
    };
    const convertMsToHM = (milliseconds) => {
      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      seconds = seconds % 60;
      minutes = seconds >= 30 ? minutes + 1 : minutes;
      minutes = minutes % 60;
      hours = hours % 24;
      // console.log(`${padDigits(hours)} hours, ${padDigits(minutes)} minutes ago`);
      // return `${padDigits(hours)} hours, ${padDigits(minutes)} minutes ago`;
      if (padDigits(hours) >= 23) {
        return new Date(newDate).toLocaleDateString("en-us", options);
      } else if (padDigits(hours) < 24) {
        return padDigits(hours) > 1
          ? `${padDigits(hours)} hours ago `
          : `${padDigits(minutes)} minutes ago`;
      } else {
        console.log("not working");
      }
    };

    return convertMsToHM(timeSubtract);
  };
  timeSetter();

  const getTweetDocs = async () => {
    const tweetRef = await doc(db, "tweets", tweetID);

    const userRef = await doc(db, "users", user.uid);

    await updateDoc(userRef, {
      likedTweets: likeActive ? arrayUnion(tweetID) : arrayRemove(tweetID),
      commentedTweets: commentActive ? arrayUnion(tweetID) : arrayRemove(tweetID),
      retweetedTweets: retweetActive ? arrayUnion(tweetID) : arrayRemove(tweetID),
    });

    await updateDoc(tweetRef, {
      likes: likeActive ? increment(1) : increment(0),
      commentCount: commentActive ? increment(1) : increment(0),
      retweets: retweetActive ? increment(1) : increment(0),
    });
  };

  // getTweetDocs();

  // alreadyLiked ? setLikeActive(true) : setLikeActive(false);
  // alreadyRetweeted ? setRetweetActive(true) : setRetweetActive(false);
  // alreadyCommented ? setCommentActive(true) : setCommentActive(false);

  useEffect(() => {
    likeActive ? getTweetDocs() : setLikeCount(likes);
    retweetActive ? getTweetDocs() && setRetweetCount(retweets + 1) : setRetweetCount(retweets);
    commentActive ? getTweetDocs() : setCommentCount(comments);
    typeof image === "string" ? setImageShow(true) : setImageShow(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeActive, retweetActive, commentActive]);

  return (
    <div className={styles.container}>
      <Row className={`${styles.border}`}>
        <Col sm={12} className={styles.textbox}>
          <div className={styles.userInfo}>
            <Image
              className={styles.profilePicture}
              src={profilePicture || defaultPicture}
              alt="profile-picture"
            />
            <h3 className={styles.username}>{name}</h3>
            <p className={styles.userHandler}>
              @<span>{username.replaceAll(" ", "_")}</span>
            </p>
            <p className={`${styles.userHandler} ${styles.tweetTime}`}>
              - <span>{timeSetter()}</span>
            </p>
          </div>
        </Col>
        <Col sm={12}>
          <div className={styles.tweetText}>{tweet}</div>
          {imageShow ? (
            <div className="mb-3">
              <Image onClick={handleShow} className={styles.imageFit} src={image} alt="altTag" />
            </div>
          ) : null}
          <div className={styles.reactions}>
            <div>
              <FontAwesomeIcon
                id="like"
                onClick={() => handleClick("like")}
                icon={faHeart}
                className={likeActive ? styles.clickedHeartComment : `${styles.icons}`}
              />
              <span className={styles.reactionCount}>{likeCount === 0 ? null : likeCount}</span>
            </div>
            <div>
              <FontAwesomeIcon
                id="retweet"
                onClick={() => handleClick("retweet")}
                icon={faRetweet}
                className={retweetActive ? `${styles.clickedHeartComment}` : `${styles.icons}`}
              />
              <span className={styles.reactionCount}>
                {retweetCount === 0 ? null : retweetCount}
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faComment}
                id="comment"
                onClick={() => handleClick("comment")}
                className={commentActive ? `${styles.clickedHeartComment}` : `${styles.icons}`}
              />
              <span className={styles.reactionCount}>
                {commentCount === 0 ? null : commentCount}
              </span>
            </div>
            <div>
              <FontAwesomeIcon icon={faShareFromSquare} id="share" className={`${styles.icons}`} />
            </div>
          </div>
        </Col>
      </Row>

      {/* Image Click Modal */}
      <Modal
        // className={ModalStyles.modalBackground}
        dialogClassName={ModalStyles.modalTweetImage}
        show={show}
        onHide={handleClose}
        centered
        size="md"
      >
        <Image src={image} className="w-100" alt="altTag" />
      </Modal>

      {/* Comment Modal */}
      {/* <ModalComment show={commentShow} tweetID={tweetID} onHide={handleCommentClose} /> */}
    </div>
  );
};

export default Tweet;
