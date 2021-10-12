import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Cart from './Cart'
import Filter from './Filter'
import Products from './Products'
class Home extends Component {
  render () {
    return (
      <>
        <Container>
          <Row>
            <Col md={8}>
              <Filter />
              <Products />
            </Col>
            <Col md={4}>
              <h5>
                <Cart />
              </h5>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Home
