import { Container, Button } from "react-bootstrap";
import {Link } from "react-router-dom";

function MainMenu() {
  return (
    <Container className="mainmenu">
      <Container className="mb-2">
        <Button className="addChildButton" variant="primary" size="lg">
          Add a child
        </Button>
        <Link to="/connect"><Button className="connectButton" variant="primary" size="lg">
          Connect
        </Button></Link> 
      </Container>
    </Container>
  );
}

export default MainMenu;
