import React, {useContext} from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {AuthDetails} from "./AuthDetails";

function MainMenu() {
  const { loggedUser } = useContext(AuthDetails);
  return (
    <Container className="mainmenu">
      <Row className="text-center">
        <Col md={{ span: 6, offset: 3 }}>
        {loggedUser && (loggedUser.userRole === "manager" )&& (
        <Link to="/addchild">
        <Button className="addChildButton" variant="primary" size="lg" style={{margin: 5}}>
          Add a child
        </Button>
        </Link>
        )}

        <Link to="/connect">
          <Button className="connectButton" variant="primary" size="lg" style={{margin: 5}}>
            Message
          </Button>
        </Link>

        <Link to="/archive">
          <Button className="archiveButton" variant="primary" size="lg" style={{margin: 5}}>
            Archive
          </Button>
        </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default MainMenu;
