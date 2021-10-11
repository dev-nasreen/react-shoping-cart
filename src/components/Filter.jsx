import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterProducts, sortProducts } from '../redux/actions/productActions'
class Filter extends Component {
  render () {
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <div className='filter d-flex justify-content-around my-4 border-bottom py-3'>
        <div className='filter-result'>
          {this.props.filteredProducts.length} Products
        </div>
        <div className='filter_sort'>
          Order{' '}
          <select
            value={this.props.sort}
            onChange={e =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value='latest'>Latest</option>
            <option value='lowest'>Lowest</option>
            <option value='highest'>Highest</option>
          </select>
        </div>
        <div className='filter_size'>
          Filter{' '}
          <select
            value={this.props.size}
            onChange={e =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value=''>All</option>
            <option value='XS'>XS</option>
            <option value='S'>S</option>
            <option value='M'>M</option>
            <option value='L'>L</option>
            <option value='XL'>XL</option>
            <option value='XXL'>XXL</option>
          </select>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems
  }),
  {
    filterProducts,
    sortProducts
  }
)(Filter)
