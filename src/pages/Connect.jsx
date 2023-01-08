import React from "react";
import { Container, Card, CardGroup, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Navigation from "../components/Navigation";

function Connect() {
  return (
    <>
      <Navigation />
      <Container className="connect">
        <Container className="connectArea">
          <Sidebar />
          <Chat />
        </Container>
      </Container>
    </>
  );
}

export default Connect;
