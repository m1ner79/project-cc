import React, { useState } from "react";
import { Form, Button, Container, Card, Image } from "react-bootstrap";
import validator from "validator";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";



const Register = () => {
  const [signupError, setSinupError] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {

    //event.preventDefault();
    const firstName = event.target[0].value;
    const lastName = event.target[1].value;
    const email = event.target[2].value;
    const password = event.target[3].value;
    const file = event.target[4].files[0];
    const fullName = firstName + " " + lastName;

    const form = event.currentTarget;

    try {
       //Create a user
      const response = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, fullName);

      const uploadTask = uploadBytesResumable(storageRef, file);


      uploadTask.on(
        
        (error) => {
          
          // Handle unsuccessful uploads
          setSinupError(true);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateProfile(response.user, {
              firstName,
              lastName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              firstName,
              lastName,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
    } catch (signupError) {
      setSinupError(true);
    }

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
            {signupError && (
              <span>Some details were incorrect. Try again.</span>
            )}
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Are you already registered?{" "}
          <a href="/Login">
            <b>Login</b>
          </a>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Register;
