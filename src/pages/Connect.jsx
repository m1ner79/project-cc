import React from "react";
import {Container, Button} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Navigation from "../components/Navigation";
import {Link} from "react-router-dom";

function Connect() {
  return (
    <>
    <Navigation />
      <Container className="connect">
        <Container className="wrapper">
          <Container className="connectArea">
            <Sidebar />
            <Chat />
          </Container>
          <Link to="/">
            <Button className="connectButton" variant="primary" size="lg">
              Back to Main Menu
            </Button>
          </Link>
        </Container>
      </Container>
    </>
  );
}

export default Connect;
