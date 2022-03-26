import React from "react";
import styles from "./HomeLoggedIn.module.css";
import Timeline from "../Timeline/Timeline";
import { Container } from "react-bootstrap";
import NavbarCustom from "../Navbar/Navbar";
import Trending from "../Trending/Trending";

const HomeLoggedIn = () => {
  return (
    <Container fluid className={styles.bg}>
      <div className={styles.containerNav}>
        <NavbarCustom />
      </div>
      <div className={styles.containerTimeline}>
        <Timeline />
      </div>
      <div className={styles.containerTrend}>
        <Trending />
      </div>
    </Container>
  );
};

export default HomeLoggedIn;
