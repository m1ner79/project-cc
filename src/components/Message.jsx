import React from "react";
import { Container, Image } from "react-bootstrap";

function Message() {
  return (
    <>
      <Container className="message loggedUser">
        <Container className="messageDetails">
          <Image
            className="avatar"
            src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg"
            alt="avatar"
            roundedCircle
          />
          <span>time/date</span>
        </Container>
        <Container className="messageSubject">
          <p>Yo,yo!</p>
        </Container>
      </Container>
    </>
  );
}

export default Message;
