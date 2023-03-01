import React, { useContext } from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import {
  BsFillCameraReelsFill,
  BsFillTelephoneFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import Messages from "./Messages";
import Input from "./Input";
import { MessageDetails } from "./MessageDetails";

const Chat = () => {
  const { data } = useContext(MessageDetails);
  return (
    <Container className="chat">
      <br></br>
      <Container className="chatDetails">
        <span>{data.user?.displayName}</span>
      </Container>
      <br></br>
      <Messages />
      <br></br>
      <Input />
    </Container>
  );
};

export default Chat;
