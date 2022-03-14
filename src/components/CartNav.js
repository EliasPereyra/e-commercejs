import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBag, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingBag, faTimes);

import Cart from "./Cart";

function CartNav({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) {
  const [isCartVisible, setIsCartVisible] = useState(false);

  return (
    <div className="nav">
      <div
        className="nav__cart"
        onClick={() => setIsCartVisible(!isCartVisible)}
      >
        {!isCartVisible ? (
          <button className="nav__cart-open">
            <FontAwesomeIcon size="2x" icon="shopping-bag" color="#292B83" />
            {cart !== null ? <span>{cart.total_items}</span> : ""}
          </button>
        ) : (
          <button className="nav__cart-close">
            <FontAwesomeIcon size="1x" icon="times" color="white" /> Close
          </button>
        )}
      </div>
      {isCartVisible && (
        <Cart
          cart={cart}
          onUpdateCartQty={onUpdateCartQty}
          onRemoveFromCart={onRemoveFromCart}
          onEmptyCart={onEmptyCart}
        />
      )}
    </div>
  );
}

CartNav.propTypes = {
  cart: PropTypes.object,
};

export default CartNav;
