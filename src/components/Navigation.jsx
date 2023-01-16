
import {Navbar,Nav, Container, Button, Image} from 'react-bootstrap';
import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import {AuthDetails} from './AuthDetails';
import { auth } from "../firebase";

const Navigation = () => {

  const {loggedUser} = useContext(AuthDetails);
  console.log({loggedUser});

  return (
    <Navbar className='navigation' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Image src="logo.png" rounded/>
          <Navbar.Brand href="#home">Creche Connect</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Button classname='logoutButton' variant="light" onClick={()=>signOut(auth)}>Logout</Button>{' '}
            </Nav>
            <Image className='avatar' src={loggedUser.photoURL}
                  alt="avatar" roundedCircle/>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Navigation;