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
      where("searchArray", "array-contains", userName.toLowerCase())
    );
  
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const usersArray = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((user) => user.uid !== loggedUser.uid);
        setUser(usersArray);
        setErr(false); // Reset error state if user is found
      } else {
        setUser(null);
        setErr(true);
      }
    } catch (err) {
      console.error("Error searching for user:", err);
      setUser(null);
      setErr(true);
    }
  };
  

  const handleKey = (event) => {
    event.key === "Enter" && handleSearch();
  };

  const handleMessaging = async (user) => {
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
          messageDetails: [],
        });
      }
      //create person messages
      await updateDoc(doc(db, "userMessages", loggedUser.uid), {
        [loggedUserRef + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [loggedUserRef + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userMessages", user.uid), {
        [loggedUserRef + ".userInfo"]: {
          uid: loggedUser.uid,
          displayName: loggedUser.displayName,
          photoURL: loggedUser.photoURL,
        },
        [loggedUserRef + ".date"]: serverTimestamp(),
      });
    } catch (err) {
      setErr(true);
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
      {err && (
        <Form.Text className="text-muted">
          <b>Person not found</b>
        </Form.Text>
      )}
      {user && (
        user.map((u) => <Container key={u.uid} className="userMessages" onClick={() => handleMessaging(u)} style={{marginTop: 10
        }}>
          <Image
            className="avatar"
            src={u.photoURL}
            alt="avatar"
            width="30"
            height="30"
            roundedCircle
          />
          <Container className="userMessagesInfo">
            <span>{u.displayName.toUpperCase()}</span>
          </Container>
        </Container>
      ))}
    </Container>
  );
};

export default Search;