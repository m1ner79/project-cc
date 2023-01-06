import React, { useState } from "react";
import { Form, Button, Container, Card, Image } from "react-bootstrap";
import validator from "validator";

function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [passwordError, setPasswordError] = useState("");
  const validatePassword = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPasswordError("This is a strong password");
    } else {
      setPasswordError("This is NOT a strong password");
    }
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
    <Container className="regForm">
      <Card>
        <Card.Header className="regFormCard" as="h5">
          <Image src="logo.png" rounded />
          Register for Creche Connect
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>First Name</Form.Label>
              <Form.Control required type="text" placeholder="First name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Last Name</Form.Label>
              <Form.Control required type="text" placeholder="Last name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
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
              <Form.Control
                type="password"
                onChange={(e) => validatePassword(e.target.value)}
              />
              {passwordError === "" ? null : (
                <Form.Control.Feedback>{passwordError}</Form.Control.Feedback>
              )}
              <Form.Text className="text-muted">
                Your password must be minimum 8 characters long, contain
                letters, numbers, special characters, upper and lower cases.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom04">
              <Form.Label>Add avatar</Form.Label>
              <Form.Control type="file" required name="file" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Are you already registered? <b>Login</b>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Register;
