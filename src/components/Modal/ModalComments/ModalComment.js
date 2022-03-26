import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ModalStyles from "../../SignUp/SignUp.module.css";
import Tweet from "../../Tweet/Tweet";
import { getTweetComments } from "../../../firebase";
import MakeComment from "./MakeComment/MakeComment";

const ModalComment = ({ show, onHide, tweetID }) => {
  const [commentsArray, setCommentsArray] = useState();

  // useEffect(() => {
  //   const tweetSetting = async () => {
  //     await getTweetComments(tweetID).then((data) => {
  //       setCommentsArray(data);
  //     });
  //   };

  //   tweetSetting();
  // }, [tweetID]);

  // console.log(`This tweet, ${tweetID}, has this comment array.`, commentsArray)

  return (
    <Modal
      centered
      size="md"
      show={show}
      onHide={onHide}
      dialogClassName={ModalStyles.modalTweetImage}
      className={ModalStyles.modalBackground}
    >
      <MakeComment />
    </Modal>
  );
};

export default ModalComment;
