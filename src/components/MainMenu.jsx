import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function MainMenu() {
  return (
    <Container className="mainmenu">
      <Row className="text-center">
        <Col md={{ span: 6, offset: 3 }}>
        <Link to="/addchild">
        <Button className="addChildButton" variant="primary" size="lg" style={{marginRight: 5, marginTop: 10}}>
          Add a child
        </Button>
        </Link>

        <Link to="/connect">
          <Button className="connectButton" variant="primary" size="lg" style={{marginTop: 10}}>
            Message
          </Button>
        </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default MainMenu;
