import React from "react";
import { Container } from "react-bootstrap";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <>
      <Container className="sidebar">
      <Container className="fixed">
        <br></br>
        <Search />
        <br></br>
        <Container className="text-center">
        <span style={{color: "#273c4d", height: 20, display: "inline-block", marginBottom: 15}}>Your last messages</span>
        </Container>
      </Container>
        <Chats />
      </Container>
    </>
  );
};

export default Sidebar;
