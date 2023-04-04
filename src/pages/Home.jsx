import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import MainMenu from "../components/MainMenu";
import Navigation from "../components/Navigation";
import Welcome from "../components/Welcome";
import { AuthDetails } from "../components/AuthDetails";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Carousel from "../components/Carousel";

function Home() {
  const { loggedUser } = useContext(AuthDetails);
  const [children, setChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChildren = async () => {
      const querySnapshot = await getDocs(collection(db, "children"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChildren(data);
      console.log(data); // Log the fetched data to the console
    };

    fetchChildren();
  }, [loggedUser]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredChildren = children.filter((child) => {
    const lowFirstName = child.lowFirstName || "";
    const lowLastName = child.lowLastName || "";
  
    return (
      lowFirstName.includes(searchTerm.toLowerCase()) ||
      lowLastName.includes(searchTerm.toLowerCase())
    );
  });
  return (
    <>
      <Navigation />
      <Container className='home'>
        <Welcome />
        <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Control
              type="text"
              placeholder="Search for a child by name"
              onChange={handleSearch}
              value={searchTerm}
              className="mb-3"
            />
            <Carousel key={filteredChildren.length} children={filteredChildren} />
          </Col>
        </Row>
        </Container>
        <MainMenu />
      </Container>
    </>
  );
}

export default Home;
