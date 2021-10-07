import React, { Component } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default class Products extends Component {
  render () {
    return (
      <Row className='flex'>
        {this.props.products.map(product => (
          <Col md={4} key={product._id}>
            <Card className='mb-3'>
              <Card.Img variant='top' src={product.image} />
              <Card.Body>
                <Card.Title>
                  <a href={'#' + product._id}> {product.title}</a>{' '}
                </Card.Title>
                <Card.Text>
                  <h3>Price: ${product.price}</h3>
                </Card.Text>

                <Button
                  variant='info'
                  className='text-white'
                  onClick={() => this.props.addToCart(product)}
                >
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )
  }
}
