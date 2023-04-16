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
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchChildren = async () => {
      const querySnapshot = await getDocs(collection(db, "children"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChildren(data);
      // console.log(data); // Log the fetched data to the console
    };

    fetchChildren();
  }, [loggedUser, refresh]);

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
            <Form.Control
              type="text"
              placeholder="Search for a child by name"
              onChange={handleSearch}
              value={searchTerm}
              className="mb-3"
              style={{marginTop: "10px"}}
            />
            {filteredChildren.length > 0 ? (
              <Carousel key={filteredChildren.length} children={filteredChildren} onRefresh={handleRefresh} />
            ) : (
              <p style={{ textAlign: 'center', marginTop: '20px' }}>
                {searchTerm
                  ? "There is no child with this name in the system."
                  : "No children found."}
              </p>
            )}
        </Container>
        <MainMenu />
      </Container>
    </>
  );
}

export default Home;
