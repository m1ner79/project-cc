/*
@author Michal Gornicki
@Start Date 04/12/2022
*/
import React, {useContext, useState} from "react";
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AuthDetails} from "./AuthDetails";

const ChildDetails = ({child, removeChild}) => {
    let fullName = `${child.lowFirstName} ${child.lowLastName}`; // combine first and last name
    let fullNameCaps = fullName.toUpperCase(); // convert to uppercase

    const [showCopyPopup, setShowCopyPopup] = useState(false);
    const {loggedUser} = useContext(AuthDetails);

    const getCurrentFormattedDate = () => {
        const today = new Date();
        return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    };

    const copyDailyReviews = () => {
        const reviews = child.dailyReviews
            .filter((review) => review.date === getCurrentFormattedDate())
            .map((review, index) => {
                return `
      Meal Time: ${review.mealTime}
      Meals: ${review.meals}
      Nappy Time: ${review.nappyTime}
      Nappy Status: ${review.nappyStatus}
      Activities: ${review.activities}
      Other Comments: ${review.otherComments}
      Updated By: ${review.updatedBy}
      Updated At: ${new Date(review.timestamp?.toDate()).toLocaleTimeString()}
            `;
            });

        const reviewsText = reviews.join("\n\n");

        navigator.clipboard.writeText(reviewsText).then(
            () => {
                // console.log("Daily reviews copied to clipboard!");
                setShowCopyPopup(true);
                setTimeout(() => {
                    setShowCopyPopup(false);
                }, 3000);
            },
            (err) => {
                // console.error("Could not copy daily reviews: ", err);
            }
        );
    };

    return (
        <Card className="carousel">
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
                    <b>Additional Information:</b> <br></br>
                    {child.additionalInfo}
                </Card.Text>
                <Card.Text>
                    <b><u>DAILY REVIEWS - {new Date().toLocaleDateString()}</u></b>
                    {child.dailyReviews &&
                        child.dailyReviews
                            .filter((review) => review.date === getCurrentFormattedDate())
                            .map((review, index) => (
                                <div key={index} style={{marginBottom: "10px"}}>
                                    <b>Meal Time:</b> {review.mealTime} <br/>
                                    <b>Meals:</b> {review.meals} <br/>
                                    <b>Nappy Time:</b> {review.nappyTime} <br/>
                                    <b>Nappy Status:</b> {review.nappyStatus} <br/>
                                    <b>Activities:</b> {review.activities} <br/>
                                    <b>Other Comments:</b> {review.otherComments} <br/>
                                    <b>Updated By:</b> {review.updatedBy} <br/>
                                    <b>Updated At:</b>{" "}
                                    {new Date(review.timestamp?.toDate()).toLocaleTimeString()}
                                </div>
                            ))}
                </Card.Text>
                <Card.Footer
                    className="formCardFoot text-center"
                >
                    <Link to={`/daily-review/${child.id}`}>
                        <Button
                            variant="primary"
                        >
                            Add Review
                        </Button>
                    </Link>
                    <Button
                        variant="primary"
                        onClick={copyDailyReviews}
                    >
                        Copy Review
                    </Button>
                    {loggedUser && loggedUser.userRole === "manager" && (
                        <Link to={`/update/${child.id}`}>
                            <Button
                                variant="primary"
                            >
                                Update Child
                            </Button>
                        </Link>
                    )}
                    {loggedUser && loggedUser.userRole === "manager" && (
                        <Button
                            variant="danger"
                            style={{
                                backgroundColor: "crimson",
                                border: "crimson",
                            }}
                            onClick={() => removeChild(child.id)}
                        >
                            Remove
                        </Button>
                    )}
                    <br></br>
                    {showCopyPopup && (
                        <div
                            style={{
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 100,
                                backgroundColor: "#f4900c",
                                borderRadius: "5px",
                                padding: "10px",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            Daily reviews copied to clipboard!
                        </div>
                    )}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default ChildDetails;
