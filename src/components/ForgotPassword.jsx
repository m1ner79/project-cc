import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Container, Form, Button, Card, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [error, setError] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;

    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        setResetEmailSent(true);
        setTimeout(() => {
          navigate("/login"); // or use "/" if login is the root path
        }, 3000); // Redirects after 3 seconds
      } catch (error) {
        // console.error("Error sending password reset email:", error);
        // console.error("Error code:", error.code);
        // console.error("Error message:", error.message);

        if (error.code === "auth/user-not-found") {
          setError("No user found with this email address.");
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Container className="form forgotPass" style={{ marginTop: 10 }}>
        <Card>
          <Card.Header className="formCard text-center" as="h5">
            <Image src="/logo.png" alt="logo" rounded />
            Forgot Password
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleForgotPassword} inline>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control required type="email" placeholder="email" />
              </Form.Group>
              {resetEmailSent && (
                <div className="alert alert-success" role="alert">
                  <Form.Text className="text-muted">
                    <b>Password reset email sent! Please check your inbox.</b>
                  </Form.Text>
                </div>
              )}
              {error && (
                <div className="alert alert-danger" role="alert">
                  <Form.Text className="text-muted">
                    <b>{error}</b>
                  </Form.Text>
                </div>
              )}
              <Container className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  style={{ marginBottom: 10 }}
                >
                  Forgot Password?
                </Button>
              </Container>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted text-center">
            Go back to{" "}
            <Link to="/login">
              <b>Login</b>
            </Link>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPassword;
