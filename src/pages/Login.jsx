import React, { useState } from "react";
import { Form, Button, Container, Card, Image } from "react-bootstrap";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        
    } catch (error) {
      // Handle error
      setError(true);
    }
  };

  return (
    <Container className="form login">
      <Card>
        <Card.Header className="formCard text-center" as="h5">
          <Image src="/logo.png" alt="logo" rounded />
          Login
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="email"
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
              />
              <Form.Control.Feedback>Looks ok!</Form.Control.Feedback>

              <Form.Text className="text-muted">
                Your password must be minimum 8 characters long, contain
                letters, numbers, special characters, upper and lower cases.
              </Form.Text>
            </Form.Group>
            <Container className="text-center">
            <Button variant="primary" type="submit" size="lg" style={{marginBottom: 10}}>
              Sign In
            </Button>
            </Container>
          </Form>
          {error && <div className="alert alert-danger" role="alert"><Form.Text className="text-muted"><b>Entered details need to be corrected. Try again.</b></Form.Text> </div> }
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          Did you <Link to="/forgotpassword"><b>Forgot Password?</b></Link><br></br>Are you not registered? <Link to="/register"><b>Register</b></Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;