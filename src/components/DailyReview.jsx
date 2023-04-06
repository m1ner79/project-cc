import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import Navigation from "./Navigation";
import { AuthDetails } from "../components/AuthDetails";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

const DailyReview = () => {
  const [date, setDate] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [meals, setMeals] = useState("");
  const [nappyTime, setNappyTime] = useState("");
  const [nappyStatus, setNappyStatus] = useState("");
  const [activities, setActivities] = useState("");
  const [otherComments, setOtherComments] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthDetails);

  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      date: formattedDate,
      mealTime,
      meals,
      nappyTime,
      nappyStatus,
      activities,
      otherComments,
      updatedBy: loggedUser.displayName.toUpperCase(),
      timestamp: new Date(),
    };

    try {
      const childDoc = doc(db, "children", id);
      await updateDoc(childDoc, {
        dailyReviews: arrayUnion(newReview),
      });
      navigate(`/update/${id}`);
    } catch (error) {
      console.error("Error adding daily review:", error);
    }
  };

  return (
    <>
      <Navigation />
      <Container className="dailyReview" style={{ marginTop: 10 }}>
        <Card>
          <Card.Header className="formCard text-center" as="h5">
            Daily Review - {new Date().toLocaleDateString()}
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="meals">
                  <Form.Label>Meals</Form.Label>
                  <Form.Control
                    type="time"
                    name="mealTime"
                    value={mealTime}
                    onChange={(event) => setMealTime(event.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    name="meals"
                    placeholder="Enter what the child ate"
                    value={meals}
                    onChange={(event) => setMeals(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="nappies">
                  <Form.Label>Nappies</Form.Label>
                  <Form.Control
                    type="time"
                    name="nappyTime"
                    value={nappyTime}
                    onChange={(event) => setNappyTime(event.target.value)}
                  />
                  <Form.Select
                    name="nappyStatus"
                    value={nappyStatus}
                    onChange={(event) => setNappyStatus(event.target.value)}
                  >
                    <option value="">Select Nappy Status</option>
                    <option value="wet">Wet</option>
                    <option value="soiled">Soiled</option>
                    <option value="dry">Dry</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="activities">
                  <Form.Label>Activities</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="activities"
                    placeholder="Enter activities"
                    value={activities}
                    onChange={(event) => setActivities(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="otherComments">
                  <Form.Label>Other Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="otherComments"
                    placeholder="Enter other comments"
                    value={otherComments}
                    onChange={(event) => setOtherComments(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="updatedBy">
                  <Form.Label>Updated By</Form.Label>
                  <Form.Control
                    type="text"
                    name="updatedBy"
                    readOnly
                    value={loggedUser.displayName.toUpperCase()}
                  />
                </Form.Group>
              <br></br>
              <Card.Footer
                className="text-center"
                style={{ backgroundColor: "white" }}
              >
                <br></br>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "green", border: "green" }}
                >
                  Add Review
                </Button>
                <br></br>
              </Card.Footer>
            </Form>
          </Card.Body>
        </Card>
        <Container className="text-center">
          <Link to="/">
            <Button
              className="connectButton"
              variant="primary"
              size="lg"
              style={{ marginTop: 10 }}
            >
              Back to Main Menu
            </Button>
          </Link>
        </Container>
      </Container>
    </>
  );
};

export default DailyReview;