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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <Image
            className="avatar"
            src="https://avatars.githubusercontent.com/u/55558050?s=40&v=4"
            alt="avatar"
            roundedCircle
          />
        </Container>
      </Container>
    </>
  );
}

export default Message;
