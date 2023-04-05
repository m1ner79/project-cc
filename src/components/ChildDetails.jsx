import React from "react";
import { Card, Button } from "react-bootstrap";

const ChildDetails = ({ child, updateChild, removeChild }) => {
  let fullName = `${child.lowFirstName} ${child.lowLastName}`; // combine first and last name
  let fullNameCaps = fullName.toUpperCase(); // convert to uppercase
  return (
    <Card>
      <Card.Header className="formCard" as="h5">
        {fullNameCaps}
      </Card.Header>
      <Card.Body>
      <Card.Text><b>Date of Birth:</b> <br></br>{child.dob}</Card.Text>
      <Card.Text><b>Parent Name:</b> <br></br>{child.parentName}</Card.Text>
      <Card.Text><b>Parent Email:</b> <br></br>{child.parentEmail}</Card.Text>
      <Card.Text><b>Parent Mobile Number:</b> <br></br>{child.parentMobile}</Card.Text>
      <Card.Text><b>Child's Health Info:</b> <br></br>{child.healthInfo}</Card.Text>
      <Card.Text><b>Observations:</b> <br></br>{child.observations}</Card.Text>
      <Card.Text></Card.Text>
      </Card.Body>
      <Card.Footer>
      <Button variant="primary" onClick={() => updateChild(child.id)}>Update</Button>
      <Button variant="danger" onClick={() => removeChild(child.id)}>Remove</Button>
      </Card.Footer>
    </Card>
  );
};

export default ChildDetails;
