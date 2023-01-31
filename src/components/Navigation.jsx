import { Navbar, Nav, Container, Button, Image, Form } from "react-bootstrap";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthDetails } from "./AuthDetails";
import { auth } from "../firebase";

const Navigation = () => {
  const { loggedUser } = useContext(AuthDetails);
  console.log({ loggedUser });

  return (
    <Navbar
      className="navigation"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Image src="logo.png" rounded />
        <Navbar.Brand href="#home">Creche Connect</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Form.Text className="text-muted">
              {loggedUser.displayName}
            </Form.Text>
            <Image
              className="avatar"
              src={loggedUser.photoURLS} //pic is not appearing,double check
              alt="avatar"
              roundedCircle
            />
            <Button
              className="logoutButton"
              variant="light"
              onClick={() => signOut(auth)}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
