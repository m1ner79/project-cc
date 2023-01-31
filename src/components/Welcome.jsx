import { Container } from "react-bootstrap";

function Welcome() {
  return (
    <Container className="welcome">
      <Container>
        <h1>Main Menu</h1>
        <q>
          <b>
            We enhance the quality of a child's development by improving
            communication between childcare practitioners and parents.
          </b>
        </q>
      </Container>
    </Container>
  );
}

export default Welcome;
