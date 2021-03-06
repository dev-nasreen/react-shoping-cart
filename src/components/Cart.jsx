import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AiTwotoneDelete } from 'react-icons/ai'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import { removeFromCart } from '../redux/actions/cartActions.js'
import { clearOrder, createOrder } from '../redux/actions/orderActions.js'
import formatCurrency from '../util'
class Cart extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      address: '',
      showCheckout: false
    }
  }
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  createOrder = e => {
    e.preventDefault()
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
    }

    this.props.createOrder(order)
  }
  closeModal = () => {
    this.props.clearOrder()
  }
  render () {
    const { cartItems, order } = this.props
    return (
      <>
        <div className='filter d-flex justify-content-around my-4 border-bottom py-3'>
          {cartItems.length === 0 ? (
            <div className='cart cart-header'>Cart is empty</div>
          ) : (
            <div className='cart cart-header'>
              You have <span className='text-info'>{cartItems.length}</span>{' '}
              items in the cart{' '}
            </div>
          )}
          {order && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button className='close-modal' onClick={this.closeModal}>
                  x
                </button>
                <div className='order-details'>
                  <h3 className='success-message'>
                    Your order has been placed.
                  </h3>
                  <h2>Order {order._id}</h2>
                  <ul>
                    <li>
                      <div>Name:</div>
                      <div>{order.name}</div>
                    </li>
                    <li>
                      <div>Email:</div>
                      <div>{order.email}</div>
                    </li>
                    <li>
                      <div>Address:</div>
                      <div>{order.address}</div>
                    </li>
                    <li>
                      <div>Date:</div>
                      <div>{order.createdAt}</div>
                    </li>
                    <li>
                      <div>Total:</div>
                      <div>{formatCurrency(order.total)}</div>
                    </li>
                    <li>
                      <div>Cart Items:</div>
                      <div>
                        {order.cartItems.map(x => (
                          <div>
                            {x.count} {' x '} {x.title}
                          </div>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Modal>
          )}
        </div>
        <div className='cart '>
          <Fade left cascade>
            <ul className='cart-items border-bottom'>
              {cartItems.map(item => (
                <li key={item._id} className='d-flex mb-2 '>
                  <div className='cart_img me-4'>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>
                      <span style={{ fontSize: '14px' }}>{item.title}</span>
                    </div>
                    <div className='cart_right mt-2'>
                      ${item.price} x {item.count}{' '}
                      <span
                        style={{ cursor: 'pointer' }}
                        className='text-danger'
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        {' '}
                        <AiTwotoneDelete />{' '}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        <div className='cart_total d-flex justify-content-around align-items-center'>
          <Button
            variant='info'
            size='lg'
            className='text-white px-5'
            onClick={() => {
              this.setState({ showCheckout: true })
            }}
          >
            Proceed
          </Button>{' '}
          <h4>
            Total:{' '}
            {formatCurrency(
              cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
          </h4>
        </div>
        {this.state.showCheckout && (
          <Fade right cascade>
            <div className='mt-5'>
              <Form onSubmit={this.createOrder}>
                <Form.Group className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    placeholder='Enter email'
                    onChange={this.handleInput}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    placeholder='Your Name'
                    onChange={this.handleInput}
                    required
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    name='address'
                    placeholder='Apartment, studio, or floor'
                    onChange={this.handleInput}
                    required
                  />
                </Form.Group>
                <Button
                  variant='info'
                  type='submit'
                  size='lg'
                  className='text-white px-5'
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Fade>
        )}
      </>
    )
  }
}
export default connect(
  state => ({
    order: state.order.order,
    cartItems: state.cart.cartItems
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart)
