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
      </Container>
        <Chats />
      </Container>
    </>
  );
};

export default Sidebar;
