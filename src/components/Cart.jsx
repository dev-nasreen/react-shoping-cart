import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { AiTwotoneDelete } from 'react-icons/ai'
import formatCurrency from '../util'

export default class Cart extends Component {
  render () {
    const { cartItems } = this.props
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
        </div>
        <div className='cart '>
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
        </div>
        <div className='cart_total d-flex justify-content-around align-items-center'>
          <Button variant='info' size='lg' className='text-white px-5'>
            Proceed
          </Button>{' '}
          <h4>
            Total:{' '}
            {formatCurrency(
              cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
          </h4>
        </div>
      </>
    )
  }
}
