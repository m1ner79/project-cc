import React, { useContext, useState } from "react";
import { Container, Form, Image } from "react-bootstrap";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthDetails } from "./AuthDetails";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { loggedUser } = useContext(AuthDetails);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (event) => {
    event.code === "Enter" && handleSearch();
  };

  const handleMessaging = async () => {
    // verify if person messages exist in database(create if not)
    const loggedUserRef =
      loggedUser.uid > user.uid
        ? loggedUser.uid + user.uid
        : user.uid + loggedUser.uid;
    try {
      const response = await getDoc(doc(db, "allMessages", loggedUserRef));
      //create message in database
      if (!response.exists()) {
        //create a chat in allMessages collection
        await setDoc(doc(db, "allMessages", loggedUserRef), {
          chatDetails: [],
        });
      }
      //create person messages
      await updateDoc(doc(db, "loggedUserMessages", loggedUser.uid), {
        [loggedUserRef + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [loggedUserRef + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "loggedUserMessages", user.uid), {
        [loggedUserRef + ".userInfo"]: {
          uid: loggedUser.uid,
          displayName: loggedUser.displayName,
          photoURL: loggedUser.photoURL,
        },
        [loggedUserRef + ".date"]: serverTimestamp(),
      });
    } catch (err) {
      setErr(err);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <Container className="search">
      <Container className="searchInput">
        <Form.Control
          className="inputSearch"
          type="text"
          placeholder="Find a Person"
          onKeyDown={handleKey}
          onChange={(event) => setUserName(event.target.value)}
          value={userName}
        />
      </Container>
      {err && <Form.Text className="text-muted">Person not found</Form.Text>}
      {user && (
        <Container className="userMessages" onClick={handleMessaging}>
          <Image
            className="avatar"
            src={user.photoURL}
            alt="avatar"
            roundedCircle
          />
          <Container className="userMessagesInfo">
            <span>{user.displayName}</span>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default Search;
