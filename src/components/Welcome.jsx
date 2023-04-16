/*
@author Michal Gornicki
@Start Date 04/12/2022
*/
import React, {useContext} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {AuthDetails} from "./AuthDetails";

function Welcome() {
    const {loggedUser} = useContext(AuthDetails);

    return (
        <Container className="welcome">
            <Container>
                <Row className="text-center">
                    <Col md={{span: 6, offset: 3}}>
                        <h1>Welcome, <br></br> {loggedUser.displayName.toUpperCase()}</h1>
                    </Col>
                    <q>
                        <b>
                            We enhance the quality of a child's development by improving
                            communication between childcare practitioners and parents.
                        </b>
                    </q>
                </Row>
            </Container>
        </Container>
    );
}

export default Welcome;
