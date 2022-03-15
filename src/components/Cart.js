import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import CartItem from "./CartItem";

function Cart({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) {
  const handleEmptyCart = () => {
    onEmptyCart();
  };

  const renderEmptyMessage = () => {
    if (cart.total_unique_items > 0) {
      return;
    }

    return <p className="cart__none">You have no items in your shopping cart, start adding some!</p>;
  };

  const renderItems = () => {};

  const renderTotal = () => {
    return (
      <div className="cart__total">
        <p className="cart__total-title">Subtotal:</p>
        <p className="cart__total-price">
          {cart.subtotal.formatted_with_symbol}
        </p>
      </div>
    );
  };
  console.log(renderItems);
  return (
    <div className="cart">
      <h4 className="cart__heading">Your shopping Cart</h4>
      {renderEmptyMessage()}
      {cart.line_items.map((lineItem) => (
        <CartItem
          item={lineItem}
          key={lineItem.id}
          className="cart__inner"
          onUpdateCartQty={onUpdateCartQty}
          onRemoveFromCart={onRemoveFromCart}
        />
      ))}
      {renderTotal()}
      {/* Footer */}
      <div className="cart__footer">
        <button className="cart__btn-empty" onClick={() => handleEmptyCart()}>Empty Cart</button>
        <Link className="cart__btn-checkout" to="/checkout">Checkout</Link>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.object,
  onEmptyCart: () => {},
};

export default Cart;
