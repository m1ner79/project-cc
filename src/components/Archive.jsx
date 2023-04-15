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
  const [search, setSearch] = useState({ name: "", date: "" });
  const [filteredChildren, setFilteredChildren] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "children"), (snapshot) => {
      setChildren(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const formatDate = (dateStr) => {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        // Assuming "D/M/YYYY" format
        return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
          2,
          "0"
        )}`;
      } else {
        // Assuming "YYYY-MM-DD" format
        return dateStr;
      }
    };

    setFilteredChildren(
      children.filter((child) => {
        const lowFirstName = child.lowFirstName.toLowerCase();
        const lowLastName = child.lowLastName.toLowerCase();
        const nameMatch = search.name
          ? lowFirstName.includes(search.name.toLowerCase()) ||
            lowLastName.includes(search.name.toLowerCase())
          : true;
        const dateMatch = search.date
          ? child.dailyReviews.some((review) => {
              const formattedReviewDate = formatDate(review.date);
              return formattedReviewDate === search.date;
            })
          : true;

        return nameMatch && dateMatch;
      })
    );
  }, [search, children]);

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
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group controlId="searchName">
                <Form.Label>Search by name:</Form.Label>
                <Form.Control
                  type="text"
                  value={search.name}
                  onChange={(e) =>
                    setSearch({ ...search, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="searchDate">
                <Form.Label>Search by date:</Form.Label>
                <Form.Control
                  type="date"
                  value={search.date}
                  onChange={(e) =>
                    setSearch({ ...search, date: e.target.value })
                  }
                />
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
                      {child.dailyReviews &&
                        child.dailyReviews.map((review, index) => (
                          <div key={index}>
                            <p>Date: {review.date}</p>
                            <p>Meal Time: {review.mealTime}</p>
                            <p>Meals: {review.meals}</p>
                            <p>Nappy Time: {review.nappyTime}</p>
                            <p>Nappy Status: {review.nappyStatus}</p>
                            <p>Activities: {review.activities}</p>
                            <p>Other Comments: {review.otherComments}</p>
                            <p>Updated By: {review.updatedBy}</p>
                            <p>
                              Updated At:{" "}
                              {new Date(
                                review.timestamp?.toDate()
                              ).toLocaleTimeString()}
                            </p>
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
              <Button
                onClick={handlePrint}
                variant="primary"
                style={{
                  backgroundColor: "blue",
                  border: "blue",
                  margin: 5,
                  height: 38,
                  width: 130,
                }}
              >
                Print
              </Button>
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
              style={{ margin: 5 }}
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
