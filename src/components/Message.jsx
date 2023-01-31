import React, {useContext, useEffect, useRef} from "react";
import { Container, Image } from "react-bootstrap";
import {AuthDetails} from "./AuthDetails";
import {MessageDetails} from "./MessageDetails";

const Message = ({message}) => {

  const { loggedUser } = useContext(AuthDetails);
  const { data } = useContext(MessageDetails);
  console.log(message);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <Container ref={ref} className={'message ${message.senderID === loggedUser.uid && "loggedUser"}'}>
        <Container className="messageDetails">
          <Image
            className="avatar"
            src= {message.senderID === loggedUser.uid ? loggedUser.photoURL : data.user.photoURL}
            alt="avatar"
            roundedCircle
          />
          <span>Last message:</span>
        </Container>
        <Container className="messageSubject">
          <p>{message.text}</p>
          {message.image && <Image
              className="avatar"
              src={message.image}
              alt="avatar"
              roundedCircle
          />}
        </Container>
      </Container>
    </>
  );
}

export default Message;
