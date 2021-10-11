import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Cart from './Cart'
import Filter from './Filter'
import Products from './Products'
class Home extends Component {
  constructor () {
    super()
    this.state = {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []
    }
  }
  createOrder = e => {
    alert('New order is placed.')
  }

  addToCart = product => {
    const cartItems = this.state.cartItems.slice()
    let alreadyInCart = false
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++
        alreadyInCart = true
      }
    })
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({ cartItems })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }
  removeFromCart = product => {
    const cartItems = this.state.cartItems.slice()
    this.setState({ cartItems: cartItems.filter(x => x._id !== product._id) })
    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems.filter(x => x._id !== product._id))
    )
  }
  render () {
    return (
      <>
        <Container>
          <Row>
            <Filter />
            <Col md={8}>
              <Products addToCart={this.addToCart} />
            </Col>
            <Col md={4}>
              <h5>
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </h5>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Home
