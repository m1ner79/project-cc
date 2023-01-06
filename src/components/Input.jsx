import React from 'react'
import { Container, Form, Button} from 'react-bootstrap'

function Input() {
  return (
    <Container className='input'>
        <Form.Control type="text" placeholder="Normal text" />
        <Button variant="success">Send</Button>{' '}
    </Container>
  )
}

export default Input