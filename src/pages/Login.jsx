import React, { useState } from "react";
import { Form, Button, Container, Card, Image } from "react-bootstrap";
//import validator from "validator";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  // const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  // const [emailError, setEmailError] = useState("");
  // const validateEmail = (e) => {
  //   var email = e.target.value;
  //   if (validator.isEmail(email)) {
  //     setEmailError("Looks like a valid email");
  //   } else {
  //     setEmailError("This is NOT a valid email!");
  //   }
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) =>{

    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
    }).catch((error) => {
      console.log(error);
    })

  }

  return (
    <Container className="form login">
      <Card>
        <Card.Header className="formCard" as="h5">
          <Image src="logo.png" rounded />
          Login
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={signIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e)}
              />
              <Form.Control.Feedback>that is incorrect</Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e)}
              />
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
