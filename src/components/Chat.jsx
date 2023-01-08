import React from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import {
  BsFillCameraReelsFill,
  BsFillTelephoneFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import Messages from "./Messages";
import Input from "./Input";

function Chat() {
  return (
    <Container className="chat">
      <br></br>
      <Container className="chatDetails">
        <span>Other person</span>
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
