import React, {useContext} from "react";
import {Container, Button, Card, CardGroup} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Navigation from "../components/Navigation";
import {Link} from "react-router-dom";
import {AuthDetails} from "../components/AuthDetails";


function Connect() {
    const {loggedUser} = useContext(AuthDetails);

    // console.log("user", loggedUser);

    return (
        <>
            <Navigation/>
            <Container className="connect">
                <Container className="wrapper">
                    <CardGroup className="connectArea">
                        <Card className="sidebarCard">
                            <Sidebar/>
                        </Card>
                        <Card className="chatCard">
                            <Chat/>
                        </Card>
                    </CardGroup>
                    {loggedUser && (loggedUser.userRole === "staff" || loggedUser.userRole === "manager") && (
                        <Container className="text-center">
                        <Link to="/">
                            <Button className="connectButton" variant="primary" size="lg" style={{margin: 5}}>
                                Back to Main Menu
                            </Button>
                        </Link>
                    </Container>
                    )}
                </Container>
            </Container>
        </>
    );
}

export default Connect;
