import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navigation from "./Navigation";

const UpdateChild = ({ onUpdate }) => {
  const [updatedChild, setUpdatedChild] = useState({});
  const navigate = useNavigate();
  const { id } = useParams(); // Get the child ID from the URL

  // Fetch the child data from the database based on the child ID
  useEffect(() => {
    const fetchChild = async () => {
      try {
        const docRef = doc(db, "children", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUpdatedChild({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching child: ", error);
      }
    };

    fetchChild();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      window.confirm(
        `Are you sure you want to update child: ${updatedChild.lowFirstName} ${updatedChild.lowLastName}?`
      )
    ) {
      await onUpdate(updatedChild);
      navigate("/");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedChild({ ...updatedChild, [name]: value });
  };

  return (
    <>
      <Navigation />
      <Container className="updateChild" style={{marginTop: 10}}>
        <Card>
          <Card.Header className="formCard text-center" as="h5">
            Update Child
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lowFirstName"
                  value={updatedChild.lowFirstName || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lowLastName"
                  value={updatedChild.lowLastName || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="parentName">
                <Form.Label>Parent Name</Form.Label>
                <Form.Control
                  type="text"
                  name="parentName"
                  value={updatedChild.parentName || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={updatedChild.dob || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="parentEmail">
                <Form.Label>Parent Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={updatedChild.parentEmail || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="parentMobile">
                <Form.Label>Parent Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="parentMobile"
                  value={updatedChild.parentMobile || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="healthInfo">
                <Form.Label>Health Information</Form.Label>
                <Form.Control
                  as="textarea"
                  name="healthInfo"
                  value={updatedChild.healthInfo || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="observations">
                <Form.Label>Observations</Form.Label>
                <Form.Control
                  as="textarea"
                  name="observations"
                  value={updatedChild.observations || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <br></br>
                <Card.Footer className="text-center" style={{backgroundColor: "white"}}>
                    <br></br>
              <Button variant="primary" type="submit" style={{backgroundColor: "green", border: "green" }}>
                Update
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

export default UpdateChild;