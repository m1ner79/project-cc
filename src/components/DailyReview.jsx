/*
@author Michal Gornicki
@Start Date 04/12/2022
*/
import React, {useState, useContext, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Form, Button, Card, Container} from "react-bootstrap";
import Navigation from "./Navigation";
import {AuthDetails} from "./AuthDetails";
import {doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import {db} from "../firebase";

const DailyReview = () => {
    const [date, setDate] = useState("");
    const [mealTime, setMealTime] = useState("");
    const [meals, setMeals] = useState("");
    const [nappyTime, setNappyTime] = useState("");
    const [nappyStatus, setNappyStatus] = useState("");
    const [activities, setActivities] = useState("");
    const [otherComments, setOtherComments] = useState("");
    const navigate = useNavigate();
    const {loggedUser} = useContext(AuthDetails);
    const [childName, setChildName] = useState("");
    const {id} = useParams(); // Get the child ID from the URL

    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    // Fetch the child data from the database based on the child ID
    useEffect(() => {
        const fetchChild = async () => {
            try {
                const docRef = doc(db, "children", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setChildName({id: docSnap.id, ...docSnap.data()});
                } else {
                    // console.log("No such document!");
                }
            } catch (error) {
                // console.error("Error fetching child: ", error);
            }
        };

        fetchChild();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm(`Are you happy with the review information for child: ${childName.lowFirstName.toUpperCase()} ${childName.lowLastName.toUpperCase()}?`)) return;

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
            navigate(`/`);
        } catch (error) {
            // console.error("Error adding daily review:", error);
        }
    };

    return (
        <>
            <Navigation/>
            <Container className="dailyReview" style={{marginTop: 10}}>
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
                                style={{backgroundColor: "white"}}
                            >
                                <br></br>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        backgroundColor: "blue",
                                        border: "blue",
                                        margin: 5,
                                        height: 38,
                                        width: 130
                                    }}
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
                            style={{margin: 5}}
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