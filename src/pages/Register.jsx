import React, { useState } from "react";
import { Form, Button, Container, Card, Image } from "react-bootstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {

// Form inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [picture, setPicture] = useState(null);
    const [formValid, setFormValid] = useState(false);
    const [errors, setErrors] = useState({});

    // Handle form submission
    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!formValid) {
            return;
        }

        try {
            // Create a user with email and password
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const date = new Date().getTime();
            const storageRef = ref(storage, `${email + picture.name + date}`);

            const uploadResult = await uploadBytesResumable(storageRef, picture);
            const profileDownloadURL = await getDownloadURL(uploadResult.metadata.ref);

            try{
                // Update the user's profile
                await updateProfile(response.user, {
                    displayName: firstName + " " + lastName
                });
                //create user on firestore
                await setDoc(doc(db, "users", response.user.uid), {
                    uid: response.user.uid,
                    displayName: response.user.displayName,
                    email: response.user.email,
                    photoURL: profileDownloadURL
                });
            } catch (error) {
                // Handle error
                console.log("Error creating user:", error);
            }
        } catch (error) {
            // Handle error
            console.log(error);
        }
    };

// Validate the form inputs
    const validateForm = () => {

        let valid = true;
        let errors = {};

        if (!firstName || firstName.length < 2) {
            errors.firstName = <Form.Text className="text-muted">First name must be at least 2 characters</Form.Text>;
            valid = false;
        }

        if (!lastName || lastName.length < 2) {
            errors.lastName = <Form.Text className="text-muted">Last name must be at least 2 characters</Form.Text>;
            valid = false;
        }

        if (!email) {
            errors.email = <Form.Text className="text-muted">Email address is required</Form.Text>;
            valid = false;

        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = <Form.Text className="text-muted">Invalid email address</Form.Text>;;
            valid = false;
        }

        if (!picture) {
            errors.picture = <Form.Text className="text-muted">Please upload a profile picture</Form.Text>;
            valid = false;
        }

        // Password validation
        if (!password) {
            errors.password = <Form.Text className="text-muted">Password is required</Form.Text>;
            valid = false;

        } else if (password.length < 8) {
            errors.password = <Form.Text className="text-muted">Your password must be minimum 8 characters long</Form.Text>;
            valid = false;
        } else if (!/[a-z]/.test(password)) {
            errors.password = <Form.Text className="text-muted">Password must contain at least one lowercase letter</Form.Text>;
            valid = false;
        } else if (!/[A-Z]/.test(password)) {
            errors.password = <Form.Text className="text-muted">Password must contain at least one uppercase letter</Form.Text>;
            valid = false;
        } else if (!/\d/.test(password)) {
            errors.password = <Form.Text className="text-muted">Password must contain at least one number</Form.Text>;
            valid = false;
        } else if (!/[!@#\$%\^&\*]/.test(password)) {
            errors.password = <Form.Text className="text-muted">Password must contain at least one symbol</Form.Text>;
            valid = false;
        }

        setErrors(errors);
        setFormValid(valid);

    };

    return (
        <Container className="regForm">
            <Card>
                <Card.Header className="regFormCard" as="h5">
                    <Image src="logo.png" rounded />
                    Register for Creche Connect
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onBlur={validateForm}
                                required
                            />
                            {errors.firstName &&
                                <div className="error-text">{errors.firstName}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                onBlur={validateForm}
                                required
                            />
                            {errors.lastName &&
                                <div className="error-text">{errors.lastName}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={validateForm}
                                required
                            />
                            {errors.email &&
                                <div className="error-text">{errors.email}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={validateForm}
                                required
                            />
                            {errors.password &&
                                <div className="error-text">{errors.password}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustom04">
                            <Form.Label>Add avatar</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setPicture(e.target.files[0])}
                                onBlur={validateForm}
                                required
                            />
                            {errors.picture &&
                                <div className="error-text">{errors.picture}</div>}
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!formValid}>
                            Sign Up
                        </Button>
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

};

export default Register;