import React from 'react';
import { Container } from 'react-bootstrap';
import Search from './Search';
import Chats from './Chats';

function Sidebar() {
  return (
    <>
    <Container className="sidebar">
      <br></br>
      <Search />
      <br></br>
      <Chats />
    </Container>
    </>
  )
}

export default Sidebar