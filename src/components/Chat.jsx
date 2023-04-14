import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Messages from "./Messages";
import Input from "./Input";
import { MessageDetails } from "./MessageDetails";

const Chat = () => {
  const { data } = useContext(MessageDetails);
  return (
    <Container className="chat">
      <Container className="fixed">
      <br></br>
      <Container className="chatDetails">
        <span>{data.user?.displayName?.toUpperCase()}</span>
      </Container>
      <br></br>
      </Container>
      <Messages />
      <Container className="fixed-bottom">
      <Input />
      </Container>
    </Container>
  );
};

export default Chat;
