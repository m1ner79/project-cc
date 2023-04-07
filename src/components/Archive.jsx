import React, { useState, useEffect } from "react";
import { Container, Form, Table, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const Archive = () => {
  const [children, setChildren] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("name");
  const [filteredChildren, setFilteredChildren] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "children"), (snapshot) => {
      setChildren(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (filter === "name") {
      setFilteredChildren(
        children.filter((child) => {
            const lowFirstName = child.lowFirstName.toLowerCase();
            const lowLastName = child.lowLastName.toLowerCase();
          
            return (
              lowFirstName.includes(search.toLowerCase()) ||
              lowLastName.includes(search.toLowerCase())
            );
          })
      );
    } else if (filter === "date") {
      setFilteredChildren(
        children.filter((child) =>
          child.dailyReviews.some((review) => review.date === search)
        )
      );
    }
  }, [search, children, filter]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Navigation />
      <Container className="archive" style={{ marginTop: 10 }}>
        <Card>
          <Card.Header className="formCard text-center" as="h5">
            Archive
          </Card.Header>
        <Card.Body>
        <Form>
          <Form.Group controlId="search">
            <Form.Label>Search by {filter}:</Form.Label>
            <Form.Control
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="filter">
            <Form.Label>Filter by:</Form.Label>
            <Form.Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="date">Date</option>
            </Form.Select>
          </Form.Group>
        </Form>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Child Name</th>
              <th>Daily Review</th>
            </tr>
          </thead>
          <tbody>
            {filteredChildren.map((child) => (
              <tr key={child.id}>
                <td>{child.lowFirstName + " " + child.lowLastName}</td>
                <td>
                  {child.dailyReviews && child.dailyReviews.map((review, index) => (
                    <div key={index}>
                    <p>Date: {review.date}</p>
                    <p>Meal Time: {review.mealTime}</p>
                    <p>Meals: {review.meals}</p> 
                    <p>Nappy Time: {review.nappyTime}</p> 
                    <p>Nappy Status: {review.nappyStatus}</p> 
                    <p>Activities: {review.activities}</p> 
                    <p>Other Comments: {review.otherComments}</p> 
                    <p>Updated By: {review.updatedBy}</p> 
                    <p>Updated At: {new Date(review.timestamp?.toDate()).toLocaleTimeString()}</p> 
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer
                className="text-center"
                style={{ backgroundColor: "white" }}
              >
                <br></br>
        <Button onClick={handlePrint}>Print</Button>
        {/* Add download and copy functionality */}
        <br></br>
        </Card.Footer>
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

export default Archive;
