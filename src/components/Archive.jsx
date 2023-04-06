import React, { useState, useEffect } from "react";
import { Container, Form, Table, Button } from "react-bootstrap";
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
      <Container style={{ marginTop: 20 }}>
        <h3>Archive</h3>
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
                  {child.dailyReviews.map((review, index) => (
                    <div key={index}>
                    <p>Date: {review.date}</p>
                    <p>Meal Time: {review.mealTime}</p>
                    <p>Meals: {review.meals}</p> 
                    <p>Nappy Time: {review.nappyTime}</p> 
                    <p>Nappy Status: {review.nappyStatus}</p> 
                    <p>Activities: {review.activities}</p> 
                    <p>Other Comments: {review.otherComments}</p> 
                    <p>Updated By: {review.updatedBy}</p> 
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={handlePrint}>Print</Button>
        {/* Add download and copy functionality */}
      </Container>
    </>
  );
};

export default Archive;
