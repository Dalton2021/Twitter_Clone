import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import defaultPicture from "../../assets/defaultPicture.png";
import defaultBgPicture from "../../assets/home-bg.png";
import Tweet from "../Tweet/Tweet";
import { useStateValue } from "../State/StateProvider/StateProvider";
import { getAllUserTweets, getAllUserLikedTweets } from "../../firebase";

const Profile = () => {
  const [tweetsActive, setTweetsActive] = useState(true);
  const [tweetsReplies, setTweetsRepliesActive] = useState(false);
  const [mediaActive, setMediaActive] = useState(false);
  const [likesTab, setLikesTabActive] = useState(false);
  const [myTweets, setMyTweets] = useState();
  const [likedTweets, setLikedTweets] = useState();

  const [{ userDocs }] = useStateValue();
  // console.log(userDocs?.commentedTweets[0]);
  // console.log(myTweets);

  useEffect(() => {
    const tweetSetting = async () => {
      await getAllUserTweets(userDocs).then((data) => {
        setMyTweets(data);
      });
      await getAllUserLikedTweets(userDocs).then((data) => {
        setLikedTweets(data);
      });
      // await getTweetComments(userDocs?.commentedTweets[0]).then((data) => {
      //   console.log(data);
      // });
    };
    tweetSetting();
  }, [userDocs]);

  //profile updates:

  // bio: bio,
  // followingCount: followingCount,
  // following: following,
  // followerCount: followersCount,
  // followedBy: followedBy,
  // allTweets: tweets,
  // tweetsReplies: tweetsReplies,
  // joined: create profile date,
  // profileBackdrop: picture
  // media: pictures,
  // likes : userDocs.likedTweets.map((tweetID) => {<Tweet tweetID stuff />})

  return (
    <Container fluid>
      {/* User information / profile header */}
      <section>
        <Row className={styles.border}>
          <Image src={defaultBgPicture} className={styles.profileBackdrop} />
          <Row>
            <div className="d-block">
              <Col>
                <Image
                  src={userDocs?.profilePicture || defaultPicture}
                  className={`${styles.borderPicture} ${styles.profilePicture}`}
                />
              </Col>
              <Col>
                <div className={styles.userInfo}>
                  <div>
                    <h3 className={styles.username}>{userDocs?.name}</h3>
                    <h3 className={styles.userHandler}>
                      @<span>{userDocs?.username.replaceAll(" ", "_")}</span>
                    </h3>
                    <p className={styles.userBio}>
                      User experience bio section. In a future update, the profile bio, along with the profile backdrop & profile picture will be editable.
                    </p>
                  </div>
                  <div>
                    <p className={styles.userJoined}>
                      Joined <span>Mar 2022</span>
                    </p>
                  </div>
                  <div className={styles.userFollow}>
                    <p>
                      <span>135</span> following
                    </p>
                    <p>
                      <span>300</span> followers
                    </p>
                  </div>
                </div>
              </Col>
            </div>
          </Row>
          {/* Nav bar */}
          <div className={styles.navbar}>
            <div className={tweetsActive ? styles.navbarActive : styles.navbarTab}>
              <h3
                onClick={() => {
                  setTweetsActive(true);
                  setTweetsRepliesActive(false);
                  setMediaActive(false);
                  setLikesTabActive(false);
                }}
              >
                Tweets
              </h3>
            </div>
            <div className={tweetsReplies ? styles.navbarActive : styles.navbarTab}>
              <h3
                onClick={() => {
                  setTweetsActive(false);
                  setTweetsRepliesActive(true);
                  setMediaActive(false);
                  setLikesTabActive(false);
                }}
              >
                Tweets & replies
              </h3>
            </div>
            <div className={mediaActive ? styles.navbarActive : styles.navbarTab}>
              <h3
                onClick={() => {
                  setTweetsActive(false);
                  setTweetsRepliesActive(false);
                  setMediaActive(true);
                  setLikesTabActive(false);
                }}
              >
                Media
              </h3>
            </div>
            <div className={likesTab ? styles.navbarActive : styles.navbarTab}>
              <h3
                onClick={() => {
                  setTweetsActive(false);
                  setTweetsRepliesActive(false);
                  setMediaActive(false);
                  setLikesTabActive(true);
                }}
              >
                Likes
              </h3>
            </div>
          </div>
        </Row>
      </section>

      {/* Tweets Only */}
      <section>
        {tweetsActive
          ? myTweets?.map((tweets) => {
              return (
                <div>
                  <Tweet
                    name={tweets.username}
                    username={tweets.username}
                    profilePicture={tweets.profilePicture}
                    tweet={tweets.tweet}
                    likes={tweets.likes}
                    comments={tweets.commentsCount}
                    retweets={tweets.retweets}
                    unixDate={tweets.date}
                    image={tweets.image}
                    tweetID={tweets.tweetID}
                    key={Math.random()}
                  />
                </div>
              );
            })
          : null}
      </section>

      {/* Tweets & Replies */}
      <section>
        {tweetsReplies
          ? myTweets?.map((tweets) => {
              return (
                <div>
                  <Tweet
                    name={tweets.username}
                    username={tweets.username}
                    profilePicture={tweets.profilePicture}
                    tweet={tweets.tweet}
                    likes={tweets.likes}
                    comments={tweets.commentsCount}
                    retweets={tweets.retweets}
                    unixDate={tweets.date}
                    image={tweets.image}
                    tweetID={tweets.tweetID}
                    key={Math.random()}
                  />
                </div>
              );
            })
          : null}
      </section>

      {/* Media */}
      <section>
        {mediaActive
          ? myTweets?.map((tweets) => {
              // console.log(`my type, ${tweets.tweetID} is ${typeof tweets.image}`);
              return typeof tweets.image === "string" ? (
                <div>
                  <Tweet
                    name={tweets.username}
                    username={tweets.username}
                    profilePicture={tweets.profilePicture}
                    tweet={tweets.tweet}
                    likes={tweets.likes}
                    comments={tweets.commentsCount}
                    retweets={tweets.retweets}
                    unixDate={tweets.date}
                    image={tweets.image}
                    tweetID={tweets.tweetID}
                    key={Math.random()}
                  />
                </div>
              ) : null;
            })
          : null}
      </section>

      {/* Likes */}
      <section>
        {likesTab
          ? likedTweets?.map((tweets) => {
              return (
                <div>
                  <Tweet
                    name={tweets.username}
                    username={tweets.username}
                    profilePicture={tweets.profilePicture}
                    tweet={tweets.tweet}
                    likes={tweets.likes}
                    comments={tweets.commentsCount}
                    retweets={tweets.retweets}
                    unixDate={tweets.date}
                    image={tweets.image}
                    tweetID={tweets.tweetID}
                    key={Math.random()}
                  />
                </div>
              );
            })
          : null}
      </section>
    </Container>
  );
};

export default Profile;
