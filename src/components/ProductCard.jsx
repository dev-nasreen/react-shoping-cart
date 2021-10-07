import React, { Component } from 'react'
import { Button, Card, Col } from 'react-bootstrap'

class ProductCard extends Component {
  render () {
    return (
      <Col md={4}>
        <Card className='mb-3'>
          <Card.Img variant='top' src={this.props.product.image} />
          <Card.Body>
            <Card.Title>{this.props.product.title}</Card.Title>
            <Card.Text>
              <h3>Price: ${this.props.product.price}</h3>
            </Card.Text>

            <Button
              variant='info'
              className='text-white'
              onClick={() => this.props.addToCart(this.props.product)}
            >
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

export default ProductCard
