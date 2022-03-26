import React, { useEffect, useState } from "react";
import MakeTweet from "../MakeTweet/MakeTweet";
import { useStateValue } from "../State/StateProvider/StateProvider";
import { getDocs, collection } from "firebase/firestore";
import { db, getAllUserLikedTweets } from "../../firebase";
import Tweet from "../Tweet/Tweet";

const Timeline = () => {
  const [{ user, userDocs }, dispatch] = useStateValue();
  const [tweetCol, setTweetCol] = useState();
  // eslint-disable-next-line no-unused-vars
  const [liked, setLiked] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [likedID, setLikedID] = useState();
  // const [likedTrueFalse, setLikedTrueFalse] = useState(false);
  // const [retweeted, setRetweeted] = useState(false);
  // const [commented, setCommented] = useState(false);

  useEffect(() => {
    const getAllTweetDocs = async () => {
      let arrayQuerySnapshot = [];

      const querySnapshot = await getDocs(collection(db, `tweets`));
      querySnapshot.forEach((doc) => {
        arrayQuerySnapshot.push(doc.data());
      });

      return setTweetCol(arrayQuerySnapshot);
    };

    const getAllLikes = async () => {
      await getAllUserLikedTweets(userDocs).then((data) => {
        setLiked(data);
      });
    };
    getAllLikes();
    getAllTweetDocs();
  }, [user, dispatch, setTweetCol, userDocs]);

  //Figure out how to set liked to true. using reactionCheck. returns value but right now is a promise. get data from it. Similar to profile

  // const likeSetting = async () => {
  //   let myLikes = await liked?.map((likes) => likes.tweetID);
  //   setLikedID(myLikes);
  //   console.log(likedID);
  // };

  // likeSetting();

  // const reactionCheck = async (tweetCheck) => {
  //   const likes = await liked.map((likeID) => {
  //     return likeID.tweetID;
  //   });

  //   likes.forEach((element) => {
  //     if (element === tweetCheck.tweetID) {
  //       console.log(true);
  //       return true;
  //     } else {
  //       console.log(false);
  //       return false;
  //     }
  //   });
  // };

  // const setting = async () => {
  //   const likes = await liked.map((likeID) => {
  //     return likeID.tweetID;
  //   });

  //   // setLikedID(likes);

  //   return likes;
  // };

  // const reactionCheck = async (tweetCheck) => {
  //   let myReaction = await liked
  //   myReaction.incl(id => )

  // }

  return (
    <div className="">
      <MakeTweet data={userDocs} />
      <div>
        {tweetCol?.map((tweets) => {
          // reactionCheck(tweets);
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
