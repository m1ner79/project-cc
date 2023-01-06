import React from 'react'
import { Container, Form } from 'react-bootstrap'

function Search() {
  return (
    <Container className='search'>
        <Container className='searchInput'>
        <Form.Control type="text" placeholder="Search" />
        </Container>
    </Container>
  )
}

export default Search