import React, {useContext} from "react";
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AuthDetails} from "./AuthDetails";

const ChildDetails = ({child, removeChild}) => {
    let fullName = `${child.lowFirstName} ${child.lowLastName}`; // combine first and last name
    let fullNameCaps = fullName.toUpperCase(); // convert to uppercase

    const { loggedUser } = useContext(AuthDetails);

    return (
        <Card>
            <Card.Header className="formCard text-center" as="h5">
                {fullNameCaps}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <b>Date of Birth:</b> <br></br>
                    {child.dob}
                </Card.Text>
                <Card.Text>
                    <b>Parent Name:</b> <br></br>
                    {child.parentName}
                </Card.Text>
                <Card.Text>
                    <b>Parent Email:</b> <br></br>
                    {child.parentEmail}
                </Card.Text>
                <Card.Text>
                    <b>Parent Mobile Number:</b> <br></br>
                    {child.parentMobile}
                </Card.Text>
                <Card.Text>
                    <b>Child's Health Info:</b> <br></br>
                    {child.healthInfo}
                </Card.Text>
                <Card.Text>
                    <b>Observations:</b> <br></br>
                    {child.observations}
                </Card.Text>
                <Card.Text>
                    <b>Daily Reviews - {new Date().toLocaleDateString()}</b>
                    <hr/>
                    {child.dailyReviews &&
                        child.dailyReviews.map((review, index) => (
                            <div key={index} style={{marginBottom: "10px"}}>
                                <b>Meal Time:</b> {review.mealTime} <br/>
                                <b>Meals:</b> {review.meals} <br/>
                                <b>Nappy Time:</b> {review.nappyTime} <br/>
                                <b>Nappy Status:</b> {review.nappyStatus} <br/>
                                <b>Activities:</b> {review.activities} <br/>
                                <b>Other Comments:</b> {review.otherComments} <br/>
                                <b>Updated By:</b> {review.updatedBy} <br/>
                                <b>Updated At:</b> {new Date(review.timestamp?.toDate()).toLocaleTimeString()}
                                <hr/>
                            </div>
                        ))}
                </Card.Text>
                <Card.Footer className="text-center" style={{backgroundColor: "white"}}>
                    <br></br>
                    {loggedUser && (loggedUser.userRole === "manager" )&& (
                    <Link to={`/update/${child.id}`}>
                        <Button variant="primary"
                                style={{backgroundColor: "green", border: "green", marginRight: 5, marginBottom: 5}}>
                            Update
                        </Button>
                    </Link>
                    )}
                    {loggedUser && (loggedUser.userRole === "manager" )&& (
                    <Button variant="danger" style={{marginBottom: 5}} onClick={() => removeChild(child.id)}>
                        Remove
                    </Button>
                    )}
                    <Link to={`/daily-review/${child.id}`}>
                        <Button
                            variant="primary"
                            style={{
                                backgroundColor: "blue",
                                border: "blue",
                                marginLeft: 5,
                                marginBottom: 5,
                            }}
                        >
                            Add Review
                        </Button>
                    </Link>
                    <br></br>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default ChildDetails;