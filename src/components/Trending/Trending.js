import React from "react";
import styles from "./Trending.module.css";
import { Col, Navbar, Row } from "react-bootstrap";
import Trend from "../UI/Trend/Trend";

const Trending = () => {
  return (
    <div className={styles.navbar}>
      <Navbar variant="dark" expand="md">
        <div className={styles.navContent}>
          <div className={styles.index}>
            <Row>
              <Col className={styles.border}>
                <h1 className={styles.header}>Trending now</h1>
              </Col>
            </Row>
            <Col className={styles.border}>
              <Trend
                trendingWhere="Trending worldwide"
                type="card"
                hashtag="BreakingNews"
                title="Space"
                content="Lunar photography improves the discovery of the moon"
                peopleTweeting="12,456"
              />
            </Col>
            <Col className={styles.border}>
              <Trend
                trendingWhere="Trending near you"
                type="basic"
                tweets="178"
                hashtag="LocalDevRemakesTwitter"
                title="Space"
                peopleTweeting="77,882"
              />
            </Col>
            <Col className={styles.border}>
              <Trend
                trendingWhere="Trending worldwide"
                type="card"
                hashtag="YourDailyPetFill"
                title="Kitty Plays Piano"
                content="It's becoming more and more likely Beethoven was indeed reborn. Just without the human parts."
                peopleTweeting="692,153"
              />
            </Col>
            <Col className={styles.border}>
              <Trend
                trendingWhere="Trending near you"
                type="basic"
                tweets="178"
                hashtag="TwitterCloneCreatesDesireToHireDev"
                title="Space"
                peopleTweeting="12,456"
              />
            </Col>
            <Col className={styles.border}>
              <Trend
                trendingWhere="Trending near you"
                type="basic"
                tweets="178"
                hashtag="LocalDevRemakesTwitter"
                title="Space"
                peopleTweeting="12,456"
              />
            </Col>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Trending;
