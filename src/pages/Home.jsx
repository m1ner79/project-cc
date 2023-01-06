import React from "react";
import { Container, Button } from "react-bootstrap";
import MainMenu from "../components/MainMenu";
import Navigation from "../components/Navigation";
import Welcome from "../components/Welcome";

function Home() {
  return (
    <>
      <Navigation />
      <Container className='home'>
        <Welcome />
        <MainMenu />
      </Container>
    </>
  );
}

export default Home;
