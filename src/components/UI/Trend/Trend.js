import React from "react";
import styles from "./Trend.module.css";
import { Image } from "react-bootstrap";
import defaultPicture from "../../../assets/defaultPicture.png";

const Trend = ({ content, title, image, hashtag, peopleTweeting, type, tweets, trendingWhere }) => {
  return (
    <div>
      {type === "card" ? (
        <div className={styles.trend}>
          <div>
            <h5 className={styles.trendingWhere}>{trendingWhere}</h5>
            <h3 className={styles.hashtag}>#{hashtag}</h3>
          </div>
          <div className={styles.card}>
            <div className="d-block">
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.content}>{content}</p>
            </div>
            <Image
              src={image || defaultPicture}
              className={styles.image}
              alt="trending-tweet-image"
            />
          </div>
          <p className={styles.peopleTweeting}>{peopleTweeting} people are tweeting about this </p>
        </div>
      ) : null}
      {type === "basic" ? (
        <div className={styles.trend}>
          <div>
            <h5 className={styles.trendingWhere}>{trendingWhere}</h5>
            <h3 className={styles.hashtag}>#{hashtag}</h3>
          </div>
          <div>
            <h1 className={styles.tweets}>{tweets}k tweets</h1>
          </div>
          <p className={styles.peopleTweeting}>{peopleTweeting} people are tweeting about this </p>
        </div>
      ) : null}
    </div>
  );
};

export default Trend;
