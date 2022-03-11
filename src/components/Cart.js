import PropTypes from 'prop-types'

import CartItem from './CartItem'


function Cart ({ cart }) {
  const handleEmptyCart = () => {
    onEmptyCart()
  }

  const renderEmptyMessage = () => {
    if (cart.total_unique_items > 1){
      return
    }

    return(
      <p>You have no items in your shopping cart, start adding some!</p>
    )
  }

  const renderItems = () => {
    cart.line_items.map((lineItem) => (
      <CartItem item={lineItem} key={lineItem.id} />
    ))
  }

  const renderTotal = () => {
    <div>
      <p>Subtotal:</p>
      <p>{cart.subtotalformatted_with_symbol}</p>  
    </div>
  }

  return (
    <div className="cart">
      <h4 className="cart__heading">Your shopping Cart</h4>
      { renderEmptyMessage() }
      { renderItems() }
      { renderTotal() }
      {/* Footer */}
      <div className="cart__footer">
        <button className="cart__btn-empty">Empty Cart</button>
        <button className="cart__btn-checkout">Checkout</button>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.object,
  onEmptyCart: () => {},
}

export default Cart