import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { BiSend, BiImageAdd } from "react-icons/bi";
import { CgAttachment } from "react-icons/cg";
import { AuthDetails } from "./AuthDetails";
import { MessageDetails } from "./MessageDetails";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  Timestamp,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

const Input = () => {
  const { loggedUser } = useContext(AuthDetails);
  const { data } = useContext(MessageDetails);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSend = async (event) => {
    event.preventDefault();

    // Check if both text and image are empty, then return and do nothing
    if (!text.trim() && !image) {
    return;
  }

    // Clear the input, image state, and any previous error messages
    setText("");
    setImage(null);
    setErrorMessage("");
    
    try {
      if (image) {
        const storageRef = ref(storage, uuidv4());
  
        const uploadTask = uploadBytesResumable(storageRef, image);
  
        uploadTask.on(
          (_err) => {
            //TODO:Handle Error
            setErr(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "allMessages", data.messageId), {
                messages: arrayUnion({
                  id: uuidv4(),
                  text,
                  senderId: loggedUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "allMessages", data.messageId), {
          messages: arrayUnion({
            id: uuidv4(),
            text,
            senderId: loggedUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
  
      await updateDoc(doc(db, "userMessages", loggedUser.uid), {
        [data.messageId + ".lastMessage"]: {
          text,
        },
        [data.messageId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userMessages", data.user.uid), {
        [data.messageId + ".lastMessage"]: {
          text,
        },
        [data.messageId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    setErrorMessage("An error occurred while sending the message.");
    // Optionally, restore the input text and image to their previous values
    setText(event.target.value);
    setImage(event.target.files[0]);
    }  
  };
  return (
    <Container className="input">
      <Form.Control
        className="inputText"
        type="text"
        placeholder="Message..."
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
      <Form.Group className="inputArea" controlId="formFile">
        <Form.Label>
          <CgAttachment />
        </Form.Label>
        <Form.Control
          type="file"
          style={{ display: "none" }}
          onChange={(event) => setImage(event.target.files[0])}
        />
      </Form.Group>
      {errorMessage && (
      <Form.Text className="text-danger">
        <b>{errorMessage}</b>
      </Form.Text>
    )}
      <Button variant="custSend" onClick={handleSend}>
        <BiSend />
      </Button>
    </Container>
  );
};

export default Input;
