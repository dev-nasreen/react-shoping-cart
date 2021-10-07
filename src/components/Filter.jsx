import React, { Component } from 'react'

class Filter extends Component {
  render () {
    return (
      <div className='filter d-flex justify-content-around my-4 border-bottom py-3'>
        <div className='filter-result'>{this.props.count} Products</div>
        <div className='filter_sort'>
          Order{' '}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option>Latest</option>
            <option value='lowest'>Lowest</option>
            <option value='highest'>Highest</option>
          </select>
        </div>
        <div className='filter_size'>
          Filter{' '}
          <select value={this.props.size} onChange={this.props.filterProducts}>
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

export default Filter