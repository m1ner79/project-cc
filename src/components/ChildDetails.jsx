import React from "react";
import { ListGroup } from "react-bootstrap";

const ChildDetails = ({ child }) => {
  return (
    <ListGroup.Item>
      <h5>{child.firstName} {child.lastName}</h5>
      <p>Date of Birth: {child.dob}</p>
      <p>Parent Name: {child.parentName}</p>
      <p>Parent Email: {child.parentEmail}</p>
      <p>Parent Mobile Number: {child.parentMobile}</p>
      <p>Child's Health Info: {child.healthInfo}</p>
    </ListGroup.Item>
  );
};

export default ChildDetails;
