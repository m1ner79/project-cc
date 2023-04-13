import React , {useContext} from "react";
import {Container, Button, Col, Row, Card, CardGroup} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Navigation from "../components/Navigation";
import {Link} from "react-router-dom";
import { AuthDetails } from "../components/AuthDetails";


function Connect() {
  const { loggedUser } = useContext(AuthDetails);

  console.log("user",loggedUser);

  return (
    <>
    <Navigation />
      <Container className="connect">
        <Container className="wrapper">
        <CardGroup className="connectArea">
      <Card className="sidebarCard">
        <Card.Body>
          <Card.Text>
          <Sidebar />
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="chatCard">
        <Card.Body>
          <Card.Text>
          <Chat />
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
          {loggedUser && (loggedUser.userRole === "staff" || loggedUser.userRole === "manager") && (
            <Link to="/">
              <Button className="connectButton" variant="primary" size="lg">
                Back to Main Menu
              </Button>
            </Link>
          )}
        </Container>
      </Container>
    </>
  );
}

export default Connect;
