import React from "react";
import styles from "./HomeSignUp.module.css";
import SignUp from "../SignUp/SignUp";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../UI/Logo/Logo";

const HomeSignUp = () => {
  return (
    <div className={styles.container}>
      <Container fluid>
        <Row>
          <div className={styles.flex}>
            <Col lg={7}>
              <div className={styles.logoBg}>
                {/* <Image fluid className={styles.img} src={HomeBg} alt="HomeBg" /> */}
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                  <Logo style={styles.logo} />
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <SignUp />
            </Col>
          </div>
          <Col>
            <div className={styles.imgBtm}>
              <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <Logo style={styles.logo} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeSignUp;
