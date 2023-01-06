import React from 'react'
import { Container, Form } from 'react-bootstrap'
import Messages from './Messages'
import Input from './Input'

function Chat() {
  return (
    <Container className='chat'>
      <br></br>
      <Container>
      <Form.Control
        type="text"
        placeholder="Name of person you are chatting with"
        aria-label="Disabled input example"
        disabled
        readOnly
      />
      </Container>
      <hr></hr>
      <Container>
        <Messages />
        <hr></hr>
        <Input />
      </Container>
    </Container>
    
  )
}

export default Chat