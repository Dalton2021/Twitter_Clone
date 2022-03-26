import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeSignUp from "./components/HomeSignUp/Home";
import { auth } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import HomeLoggedIn from "./components/HomeLoggedIn/HomeLoggedIn";
import { useStateValue } from "./components/State/StateProvider/StateProvider";
import NavbarCustom from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Trending from "./components/Trending/Trending";

//To Do list:

//2. Make a replies option for tweets. New component
//3. Grab tweets and replies
//4. Grab all media for this account
//6. Create option to view other users' profiles. This will be more extensive, have to create a link option for each tweet on timeline that links to that tweets individual user profile page.
//7. On other users' profile pages, add Follow btn to the top right of the profile picture. Update the users user is following
//8. For follower / following amount get array length of users user is following / followed by
//9. Updates to profiles

function App() {
  const [{ user }, dispatch] = useStateValue();

  const { REACT_APP_API_KEY } = process.env;

  console.log(REACT_APP_API_KEY);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("current user is", authUser);

      if (authUser) {
        // the user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        const getAllDocs = async () => {
          const docRef = doc(db, "users", authUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            dispatch({
              type: "SET_USER_DOCS",
              userDocs: docSnap.data(),
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        };
        getAllDocs();
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {user ? (
            <>
              <Route
                path="/profile"
                element={
                  <div className="bg">
                    <NavbarCustom />
                    <Profile />
                    <Trending />
                  </div>
                }
              />
              <Route
                path="/"
                element={
                  <div>
                    <HomeLoggedIn user={user} />
                  </div>
                }
              />
            </>
          ) : (
            <Route
              path="/"
              element={
                <div>
                  <HomeSignUp />
                </div>
              }
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
