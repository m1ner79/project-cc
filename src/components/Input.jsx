import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { BiSend, BiImageAdd } from "react-icons/bi";
import { CgAttachment } from "react-icons/cg";

function Input() {
  return (
    <Container className="input">
      <Form.Control
        className="inputText"
        type="text"
        placeholder="Normal text"
      />
      <Form.Group className="inputArea" controlId="formFile">
        <Form.Label>
          <CgAttachment />
        </Form.Label>
        <Form.Control type="file" style={{ display: "none" }} />
        <Form.Label>
          <BiImageAdd />
        </Form.Label>
        <Form.Control type="file" style={{ display: "none" }} />
      </Form.Group>
      <Button variant="custSend">
        <BiSend />
      </Button>{" "}
    </Container>
  );
}

export default Input;
