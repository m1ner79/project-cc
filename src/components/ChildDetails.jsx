import React from "react";
import { Card } from "react-bootstrap";

const ChildDetails = ({ child }) => {
  return (
    <Card>
      <Card.Header className="formCard" as="h5">
        {child.lowFirstName} {child.lowLastName}
      </Card.Header>
      <Card.Body>
      <Card.Text>Date of Birth: {child.dob}</Card.Text>
      <Card.Text>Parent Name: {child.parentName}</Card.Text>
      <Card.Text>Parent Email: {child.parentEmail}</Card.Text>
      <Card.Text>Parent Mobile Number: {child.parentMobile}</Card.Text>
      <Card.Text>Child's Health Info: {child.healthInfo}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ChildDetails;
