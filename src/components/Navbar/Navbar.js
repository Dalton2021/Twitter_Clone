import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./nav.css";
import { Navbar, Button, Nav, NavDropdown, Image } from "react-bootstrap";
import Logo from "../UI/Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import defaultPicture from "../../assets/defaultPicture.png";
import { useStateValue } from "../State/StateProvider/StateProvider";
import { Link, useMatch } from "react-router-dom";

const NavbarCustom = () => {
  const logout = async () => {
    await signOut(auth);
  };

  const [activeHome, setActiveHome] = useState(false);
  const [activeNotif, setActiveNotif] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);

  const [{ userDocs }] = useStateValue();

  const userLocation = window.location.pathname

  useEffect(() => {
    userLocation === "/profile" ? setActiveProfile(true) : setActiveHome(true);
  }, [userLocation]);

  return (
    <div>
      <div className={styles.navbar}>
        <Navbar className={styles.index} variant="dark" expand="md">
          <div className={styles.navContent}>
            <Navbar.Brand href="#">
              <Logo style={styles.logo} />
            </Navbar.Brand>
            <Nav className={styles.navLinkColumn}>
              {/* Home */}

              <div className={styles.navLinkGroup}>
                <Nav.Link>
                  <Link to="/">
                    <FontAwesomeIcon
                      className={
                        activeHome ? styles.navLinksIconHomeActive : styles.navLinksIconHome
                      }
                      icon={faHome}
                    />
                  </Link>
                </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    setActiveHome(true);
                    setActiveNotif(false);
                    setActiveProfile(false);
                  }}
                  className={activeHome ? styles.navLinksActive : styles.navLinks}
                >
                  <Link to="/">Home</Link>
                </Nav.Link>
              </div>

              {/* Notifications */}
              <div className={styles.navLinkGroup}>
                <Nav.Link>
                  <FontAwesomeIcon
                    className={activeNotif ? styles.navLinksIconActive : styles.navLinksIcon}
                    icon={faBell}
                  />
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    setActiveHome(false);
                    setActiveNotif(true);
                    setActiveProfile(false);
                  }}
                  className={activeNotif ? styles.navLinksActive : styles.navLinks}
                  href="#"
                >
                  Notifications
                </Nav.Link>
              </div>
              {/* Profile */}
              <div className={styles.navLinkGroup}>
                <Nav.Link>
                  <Link to="/profile">
                    <Image
                      className={
                        activeProfile ? styles.navLinksActiveProfile : styles.profilePicture
                      }
                      src={userDocs?.profilePicture || defaultPicture}
                      alt="user-profile-picture"
                    />
                  </Link>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    setActiveHome(false);
                    setActiveNotif(false);
                    setActiveProfile(true);
                  }}
                  className={activeProfile ? styles.navLinksActive : styles.navLinks}
                  href="#"
                >
                  <Link to="/profile">Profile</Link>
                </Nav.Link>
              </div>
              {/* More  */}
              <div className={styles.navLinkGroup}>
                <NavDropdown
                  className={styles.navLinksDropdown}
                  title="More"
                  id="basic-nav-dropdown"
                >
                  <div>
                    <NavDropdown.Item
                      className={styles.navLinksDropdownItem}
                      onClick={() => logout()}
                    >
                      <Link to="/">Logout</Link>
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
              </div>

              {/* Make Tweet Button */}
              <div className={styles.navLinkGroup}>
                <Nav.Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button size="lg" className={styles.btn}>
                    Tweet
                  </Button>
                </Nav.Link>
              </div>
            </Nav>
          </div>
        </Navbar>
      </div>

      <div className={styles.btmNav}>
        <Navbar className={styles.btmNav} fixed="bottom" variant="light" expand="md">
          <div className={styles.navContent}>
            <div className={styles.navLinkGroupBtm}>
              {/* Home */}
              <div className={styles.navLinkGroup}>
                <div className={styles.navBtmCenter}>
                  <Nav.Link href="#">
                    <Link to="/">
                      <FontAwesomeIcon
                        onClick={() => {
                          setActiveHome(true);
                          setActiveNotif(false);
                          setActiveProfile(false);
                        }}
                        className={
                          activeHome ? styles.navLinksIconHomeActive : styles.navLinksIconHome
                        }
                        icon={faHome}
                      />
                    </Link>
                  </Nav.Link>
                </div>
              </div>

              {/* Notifications */}
              <div className={styles.navLinkGroup}>
                <Nav.Link href="#">
                  <FontAwesomeIcon
                    onClick={() => {
                      setActiveHome(false);
                      setActiveNotif(true);
                      setActiveProfile(false);
                    }}
                    className={activeNotif ? styles.navLinksIconActive : styles.navLinksIcon}
                    icon={faBell}
                  />
                </Nav.Link>
              </div>

              {/* Profile */}
              <div className={styles.navLinkGroup}>
                <Nav.Link href="#">
                  <Link to="/profile">
                    <Image
                      onClick={() => {
                        setActiveHome(false);
                        setActiveNotif(false);
                        setActiveProfile(true);
                      }}
                      className={
                        activeProfile ? styles.navLinksActiveProfile : styles.profilePicture
                      }
                      src={userDocs?.profilePicture || defaultPicture}
                      alt="user-profile-picture"
                    />
                  </Link>
                </Nav.Link>
              </div>

              {/* More  */}
              <div className={styles.navLinkGroup}>
                <div>
                  <Nav.Link className={styles.navLinks} onClick={() => logout()}>
                    <Link to="/">Logout</Link>
                  </Nav.Link>
                </div>
              </div>
            </div>
          </div>
        </Navbar>
      </div>
    </div>
  );
};

export default NavbarCustom;
