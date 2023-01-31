import React, {useContext} from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import {
  BsFillCameraReelsFill,
  BsFillTelephoneFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import Messages from "./Messages";
import Input from "./Input";
import {MessageDetails} from "./MessageDetails";

const Chat = () => {
  const { data } = useContext(MessageDetails);
  return (
    <Container className="chat">
      <br></br>
      <Container className="chatDetails">
        <span>{data.user?.displayName}</span>
        {/* future proofing */}
        <Container className="icons">
          <ButtonGroup className="groupIcons" size="sm">
            <Button variant="custOpt">
              <BsFillCameraReelsFill />
            </Button>
            <Button variant="custOpt">
              <BsFillTelephoneFill />
            </Button>
            <Button variant="custOpt">
              <BsThreeDotsVertical />
            </Button>
          </ButtonGroup>
        </Container>
      </Container>
        <br></br>
        <Messages />
        <br></br>
        <Input />
    </Container>
  );
}

export default Chat;
