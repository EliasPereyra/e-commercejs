import React from 'react'
import PropTypes from 'prop-types'

function CartItem({ item }) {
  return (
    <div>
      <img src={item.image.url} alt={item.name} />
      {/* details */}
      <div>
        <h4>{item.name}</h4>
        {/* quantity */}
        <div>
          <p>{item.quantity}</p>
        </div>
        {/* price */}
        <div>{item.line_total.formatted_with_symbol}</div>
      </div>
      <button>Remove</button>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.object
}

export default CartItem