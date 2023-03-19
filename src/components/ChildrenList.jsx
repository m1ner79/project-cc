import React from "react";
import { ListGroup } from "react-bootstrap";
import ChildDetails from "./ChildDetails";

const ChildrenList = ({ children }) => {
  return (
    <ListGroup>
      {children.length > 0 ? (
        children.map((child) => <ChildDetails key={child.id} child={child} />)
      ) : (
        <p>No children found</p>
      )}
    </ListGroup>
  );
};

export default ChildrenList;
