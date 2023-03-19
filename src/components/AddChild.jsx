import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navigation from "./Navigation";
import {Link} from "react-router-dom";

const AddChild = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [parentName, setParentName] = useState("");
  const [dob, setDob] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [healthInfo, setHealthInfo] = useState("");
  const [observations, setObservations] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const child = {
      firstName,
      lastName,
      parentName,
      dob,
      parentEmail,
      parentMobile,
      healthInfo,
      observations,
    };
    try {
      const docRef = await addDoc(collection(db, "children"), child);
      console.log("Child added with ID: ", docRef.id);
      setFirstName("");
      setLastName("");
      setParentName("");
      setDob("");
      setParentEmail("");
      setParentMobile("");
      setHealthInfo("");
      setObservations("");
    } catch (error) {
      console.error("Error adding child: ", error);
    }
  };

  return (
    <>
    <Navigation />
    <Container className="addChild">
        <Card>
        <Card.Header className="formCard" as="h5">
          Add Child
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)} />
              </Form.Group>

              <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)} />
              </Form.Group>

              <Form.Group controlId="parentName">
                  <Form.Label>Parent Name</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter parent name"
                      value={parentName}
                      onChange={(event) => setParentName(event.target.value)} />
              </Form.Group>

              <Form.Group controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                      type="date"
                      value={dob}
                      onChange={(event) => setDob(event.target.value)} />
              </Form.Group>

              <Form.Group controlId="parentEmail">
                  <Form.Label>Parent Email</Form.Label>
                  <Form.Control
                      type="email"
                      placeholder="Enter parent email"
                      value={parentEmail}
                      onChange={(event) => setParentEmail(event.target.value)} />
              </Form.Group>

              <Form.Group controlId="parentMobile">
                  <Form.Label>Parent Mobile Number</Form.Label>
                  <Form.Control
                      type="tel"
                      placeholder="Enter parent mobile number"
                      value={parentMobile}
                      onChange={(event) => setParentMobile(event.target.value)} />
              </Form.Group>

              <Form.Group controlId="healthInfo">
                  <Form.Label>Health Information</Form.Label>
                  <Form.Control
                      as="textarea"
                      placeholder="Enter important child's health information"
                      value={healthInfo}
                      onChange={(event) => setHealthInfo(event.target.value)} />
              </Form.Group>

              <Form.Group controlId="observations">
                  <Form.Label>Observations</Form.Label>
                  <Form.Control
                      as="textarea"
                      placeholder="Enter your observations"
                      value={observations}
                      onChange={(event) => setObservations(event.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit">
                  Add Child
              </Button>
          </Form>
        </Card.Body>
        </Card>
        <Link to="/">
            <Button className="connectButton" variant="primary" size="lg">
              Back to Main Menu
            </Button>
          </Link>
      </Container>
      </>
  );
};

export default AddChild;
