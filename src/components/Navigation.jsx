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
            {loggedUser && (
              <>
                <Form.Text className="text-muted text-center">
                  {loggedUser.displayName.toUpperCase()}
                </Form.Text>
                <Image
                  className="avatar text-center"
                  src={loggedUser.photoURL} //pic is not appearing,double check
                  alt="avatar"
                  width="30"
                  height="30"
                  roundedCircle
                />
                <Button
                  className="logoutButton"
                  variant="light"
                  onClick={() => signOut(auth)}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
