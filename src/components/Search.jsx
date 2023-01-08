import React from 'react'
import { Container, Form, Image } from 'react-bootstrap'

function Search() {
  return (
    <Container className='search'>
        <Container className='searchInput'>
        <Form.Control className='inputSearch' type="text" placeholder="Find Contact" />
        </Container>
        {/* <Container className='user'>
        <Image className='avatar' src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg"
                  alt="avatar" roundedCircle/>
                  <Container className='userInfo'>
                      <span>User Name</span>
                  </Container>
        </Container> */}
    </Container>
  )
}

export default Search