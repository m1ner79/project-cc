import React, { useContext, useEffect, useRef } from "react";
import { Container, Image } from "react-bootstrap";
import { AuthDetails } from "./AuthDetails";
import { MessageDetails } from "./MessageDetails";

const Message = ({ message }) => {
  const { loggedUser } = useContext(AuthDetails);
  const { data } = useContext(MessageDetails);
  // console.log(message);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isLoggedUser = message.senderId === loggedUser.uid;

  return (
    <>
      <Container
        ref={ref}
        className={`message ${isLoggedUser ? "loggedUser" : "recipient"}`}
      >
        {isLoggedUser || <Image
          className="avatar"
          src={data.user.photoURL}
          alt="avatar"
          roundedCircle
        />}
        <Container className="messageSubject">
          <p>{message.text}</p>
          {message.img && <Image src={message.img} alt="" />}
        </Container>
        {isLoggedUser && <Image
          className="avatar"
          src={loggedUser.photoURL}
          alt="avatar"
          roundedCircle
        />}
      </Container>
    </>
  );
};

export default Message;
