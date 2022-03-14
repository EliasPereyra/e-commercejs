import PropTypes from 'prop-types'

function CartItem({ item, onRemoveFromCart, onUpdateCartQty }) {

  return (
    <div className="cart-item">
      <img className="cart-item__image" src={item.image.url} alt={item.name} />
      <div className="cart-item__details">
        <h4 className="cart-item__details-name">{item.name}</h4>
        {/* quantity */}
        <div className="cart-item__details-qty">
          <button onClick={() => item.quantity > 1 ? onUpdateCartQty(item.id, item.quantity - 1) : onRemoveFromCart(item.id)}>-</button>
          <p>{item.quantity}</p>
          <button onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</button>
        </div>
        {/* price */}
        <div className="cart-item__details-price">{item.line_total.formatted_with_symbol}</div>
      </div>
      <button className="cart-item__remove" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.object
}

export default CartItem