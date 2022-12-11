import React from 'react';
import {Navbar,Nav, Container} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Image src="logo.png" rounded/>
          <Navbar.Brand href="#home">Creche Connect</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#add_child">Add Child</Nav.Link>
              <Nav.Link href="#communicate">Communicate</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Navigation;