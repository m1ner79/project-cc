import React from "react";

import {
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
  Form,
} from "react-bootstrap";
function Test() {
  return (
    <div className="Test">
      <Container class="container-fluid">
        <Row>
          <Col md="8" lg="6" xl="4">
            <Card style={{ borderRadius: "10px" }}>
              <Card.Header>
                <img
                  src="https://avatars.githubusercontent.com/u/55558050?s=40&v=4"
                  alt="avatar 1"
                  style={{
                    borderRadius: "15px",
                    width: "40px",
                    height: "100%",
                    marginRight: "5px",
                  }}
                />
                Someone's Name
              </Card.Header>

              <Card.Body>
                <div>
                  <div
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "#a7acb1",
                    }}
                  >
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid adipisci ipsa esse? Quod, tempore ut voluptatem laborum ab nisi dolor? Ipsam fugiat facere corporis similique voluptates sequi debitis magni amet.
                    </p>
                  </div>
                </div>

                <div>
                  <div
                    style={{ borderRadius: "15px", backgroundColor: "#273c4d" }}
                  >
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis temporibus error autem ut neque aliquid, cum minima dolorem, corporis ipsum unde numquam possimus ab rerum? Vel ex vitae odit eligendi.</p>
                  </div>
                  <img
                    src="https://avatars.githubusercontent.com/u/55558050?s=40&v=4"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>

                <div>
                  <img
                    src="https://avatars.githubusercontent.com/u/55558050?s=40&v=4"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div style={{ borderRadius: "15px" }}>
                    <div>
                      <img
                        src="https://avatars.githubusercontent.com/u/55558050?s=40&v=4"
                        style={{ borderRadius: "15px" }}
                        alt="video"
                      />
                      <a href="#!">
                        <div></div>
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <img
                    src="https://avatars.githubusercontent.com/u/55558050?s=40&v=4"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "rgba(57, 192, 237,.2)",
                    }}
                  >
                    <p>...</p>
                  </div>
                </div>

                <FloatingLabel controlId="floatingTextarea" label="Message">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Test;
