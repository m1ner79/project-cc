import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navigation from "./Navigation";
import {Link} from "react-router-dom";
import {doc, updateDoc} from "firebase/firestore";

const AddChild = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [parentName, setParentName] = useState("");
  const [dob, setDob] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [healthInfo, setHealthInfo] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [childId, setChildId] = useState("");
  const lowFirstName = firstName.toLowerCase();
  const lowLastName = lastName.toLowerCase();
  const [updateMode, setUpdateMode] = useState(false);

  const buildSearchArray = (searchTerm) => {
    const searchTerms = []
    let counter = 0
    let term = ''
    for (let i of searchTerm) {
      term += i
      if (counter > 0) searchTerms.push(term)
      counter += 1
    }

    return searchTerms
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const childName = `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
     // Add the confirmation dialog
    if (!window.confirm(`Are you sure you want to add child: ${childName}?`)) {
    return;
  }

    const searchTerms = buildSearchArray(lowFirstName + ' ' + lowLastName)
    const child = {
      lowFirstName,
      lowLastName,
      parentName,
      dob,
      parentEmail,
      parentMobile,
      healthInfo,
      additionalInfo,
      childId: '',
      searchArray: searchTerms,
    };
    try {
      const docRef = await addDoc(collection(db, "children"), child);
      console.log("Child added with ID: ", docRef.id);

      // Update the childId in the database
      await updateDoc(doc(db, "children", docRef.id), {
      childId: docRef.id,
    });

      setFirstName("");
      setLastName("");
      setParentName("");
      setDob("");
      setParentEmail("");
      setParentMobile("");
      setHealthInfo("");
      setAdditionalInfo("");
      setChildId(docRef.id);
    } catch (error) {
      console.error("Error adding child: ", error);
    }
  };

  return (
    <>
    <Navigation />
    <Container className="addChild" style={{marginTop: 10}}>
        <Card>
        <Card.Header className="formCard text-center" as="h5">
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

              <Form.Group controlId="additionalInfo">
                  <Form.Label>Additional Information</Form.Label>
                  <Form.Control
                      as="textarea"
                      placeholder="Enter additional information"
                      value={additionalInfo}
                      onChange={(event) => setAdditionalInfo(event.target.value)} />
              </Form.Group>
              <br></br>
              <Card.Footer className="text-center" style={{backgroundColor: "white"}}>
              <br></br>
              <Button variant="primary" type="submit" style={{backgroundColor: "green", border: "green" }}>
                  Add Child
              </Button>
              <br></br>
              </Card.Footer>
          </Form>
        </Card.Body>
        </Card>
        <Container className="text-center">
        <Link to="/">
            <Button className="connectButton" variant="primary" size="lg" style={{marginTop: 10}}>
              Back to Main Menu
            </Button>
          </Link>
          </Container>
      </Container>
      </>
  );
};

export default AddChild;