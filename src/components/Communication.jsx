import React from "react";
import { Form, Button, Container, FloatingLabel, FormGroup } from "react-bootstrap";

function Communication() {
    return (
        <div className="Communication">
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Receiver's Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter receivers name here" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="message"
                            placeholder="Enter the title of your message here"
                        />
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel controlId="floatingTextarea" label="Message">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '300px' }}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Send
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default Communication;
