import React, { useState } from "react";
import { Form, Button, Container, Card, Image } from "react-bootstrap";
import validator from "validator";

function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("Looks like a valid email");
    } else {
      setEmailError("This is NOT a valid email!");
    }
  };

  return (
    <Container className="form login">
      <Card>
        <Card.Header className="formCard" as="h5">
          <Image src="logo.png" rounded />
          Login
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                onChange={(e) => validateEmail(e)}
              />
              <Form.Control.Feedback>{emailError}</Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
              <Form.Control.Feedback>Looks ok!</Form.Control.Feedback>

              <Form.Text className="text-muted">
                Your password must be minimum 8 characters long, contain
                letters, numbers, special characters, upper and lower cases.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Are you not registered? <b>Register</b>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Login;
