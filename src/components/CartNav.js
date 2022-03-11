import { useState } from 'react'

import Cart from './Cart'

function CartNav({ cart }) {
  const [isCartVisible, setIsCartVisible] = useState(false)

  return (
    <div className="nav">
      <div className="nav__cart" onClick={() => setIsCartVisible(!isCartVisible)}>
        {!isCartVisible ? (
          <button className="nav__cart-open">
            {cart !== null ? <span>{cart.total_items}</span> : ''} 
          </button>
          ) : (
            <button className="nav__cart-close">Close</button>
          )
        }
      </div>
      {isCartVisible &&
        <Cart cart={cart} />
      }
    </div>
  )
}

export default CartNav