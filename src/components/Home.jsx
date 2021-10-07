import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { productList } from '../data.js'
import Filter from './Filter'
import ProductCard from './ProductCard'
class Home extends Component {
  constructor () {
    super()
    this.state = {
      products: productList,
      size: '',
      sort: ''
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

  render () {
    return (
      <>
        <Container>
          <Filter
            count={this.state.products.length}
            size={this.state.size}
            sort={this.state.sort}
            sortProducts={this.sortProducts}
            filterProducts={this.filterProducts}
          />
          <Row>
            <Col md={8}>
              <Row className='flex'>
                {this.state.products.map(product => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </Row>
            </Col>
            <Col md={4}>
              <h5>Card</h5>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Home
