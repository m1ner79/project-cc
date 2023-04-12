import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Message from "./Message";
import { MessageDetails } from "./MessageDetails";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const { data } = useContext(MessageDetails);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "allMessages", data.messageId), (doc) => {
      if (doc.exists()){

        setMessages(doc.data().messages);
      } else {
        console.log("No such document!");
      }
    });
    return () => unsub();
  }, [data.messageId]);

  return (
    <Container className="messages">
      {messages && 
        messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </Container>
  );
};

export default Messages;