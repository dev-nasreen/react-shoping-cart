import React, { Component } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import { addToCart } from '../redux/actions/cartActions'
import { fetchProducts } from '../redux/actions/productActions'

class Products extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: null
    }
  }
  componentDidMount () {
    this.props.fetchProducts()
  }
  openModal = product => {
    this.setState({ product })
  }
  closeModal = () => {
    this.setState({ product: null })
  }
  render () {
    const { product } = this.state
    return (
      <>
        <Fade bottom cascade>
          <Row className='flex'>
            {this.props.products.map(product => (
              <Col md={4} key={product._id}>
                <Card className='mb-3'>
                  <a
                    href={'#' + product._id}
                    onClick={() => this.openModal(product)}
                  >
                    <Card.Img variant='top' src={product.image} />
                  </a>
                  <Card.Body>
                    <Card.Title>
                      <a
                        onClick={() => this.openModal(product)}
                        href={'#' + product._id}
                      >
                        {' '}
                        {product.title}
                      </a>
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
        </Fade>
        {product && (
          <Modal isOpen={true} openRequestClose={this.closeModal}>
            <Zoom>
              <div>
                <Row>
                  <Col md={6}>
                    <div>
                      <img src={product.image} alt={product.title} />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{ position: 'absolute', top: '0', right: '0' }}
                      >
                        <Button
                          variant='danger'
                          className='text-white rounded-circle'
                          onClick={this.closeModal}
                        >
                          {' '}
                          X{' '}
                        </Button>
                      </div>
                      <h3>{product.title}</h3>
                      <h4>${product.price}</h4>
                      <p>
                        Available Sizes:{' '}
                        {product.availableSizes.map((x, i) => (
                          <span key={i}>
                            {' '}
                            <Button variant='info' className='text-white mx-2'>
                              {x}
                            </Button>{' '}
                          </span>
                        ))}
                      </p>
                      <p>{product.description}</p>
                      <Button
                        variant='info'
                        className='text-white'
                        onClick={() => {
                          this.props.addToCart(product)
                          this.closeModal()
                        }}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Zoom>
          </Modal>
        )}
      </>
    )
  }
}

export default connect(state => ({ products: state.products.filteredItems }), {
  fetchProducts,
  addToCart
})(Products)
