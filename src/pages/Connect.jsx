import React from "react";
import { Container, Card, CardGroup, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Navigation from "../components/Navigation";

function Connect() {
  return (
    <>
      <Navigation />
      <Container className="connect">
        {/* <Card>
      <Container>
      <CardGroup>
  <Card>
    <Container>
      <Sidebar />
    </Container>
  </Card>
  <Card>
    <Container >
      <Chat />
    </Container>
  </Card>
</CardGroup>
      </Container>
    </Card>
  </Container> */}
        <Container>
          <Row >
            <Col lg="auto" >
              <Sidebar />
            </Col>
            <Col lg="auto">
              <Chat />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Connect;
