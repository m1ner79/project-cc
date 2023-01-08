
import {Navbar,Nav, Container, Button} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

function Navigation() {
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
            <Button classname='logoutButton' variant="light">Logout</Button>{' '}
            </Nav>
            <Image className='avatar' src="https://avatars.githubusercontent.com/u/55558050?s=40&v=4"
                  alt="avatar" roundedCircle/>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Navigation;