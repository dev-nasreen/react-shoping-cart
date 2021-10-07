import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { productList } from '../data.js'
import Cart from './Cart'
import Filter from './Filter'
import Products from './Products'
class Home extends Component {
  constructor () {
    super()
    this.state = {
      products: productList,
      size: '',
      sort: '',
      cartItems: []
    }
  }

  sortProducts = event => {
    // impl
    const sort = event.target.value
    console.log(event.target.value)
    this.setState(state => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : sort === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        )
    }))
  }
  filterProducts = event => {
    if (event.target.value === '') {
      this.setState({
        size: event.target.value,
        products: productList
      })
    } else {
      this.setState({
        size: event.target.value,
        products: productList.filter(
          product => product.availableSizes.indexOf(event.target.value) >= 0
        )
      })
    }
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
  }
  removeFromCart = product => {
    const cartItems = this.state.cartItems.slice()
    this.setState({ cartItems: cartItems.filter(x => x._id !== product._id) })
  }
  render () {
    return (
      <>
        <Container>
          <Row>
            <Col md={8}>
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts}
              />

              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </Col>
            <Col md={4}>
              <h5>
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
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
