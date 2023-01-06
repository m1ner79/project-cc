import { Container, Button } from "react-bootstrap";
import Navigation from "./Navigation";

function MainMenu() {
  return (
    <Container className="mainmenu">
      <Container className="mb-2">
        <Button className="addChildButton" variant="primary" size="lg">
          Add a child
        </Button>{" "}
        <Button className="connectButton" variant="primary" size="lg">
          Connect
        </Button>{" "}
      </Container>
    </Container>
  );
}

export default MainMenu;
