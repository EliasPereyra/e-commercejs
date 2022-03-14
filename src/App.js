import { useState, useEffect } from "react";

import { CartNav, ProductsList } from "./components/";
import commerce from "./lib/commerce";
import "./styles/scss/styles.scss";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = () => {
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
      })
      .catch((err) => {
        console.error("Error!!", err);
      });
  };

  const fetchCart = () => {
    commerce.cart
      .retrieve()
      .then((cart) => {
        setCart(cart);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleAddToCart = (productId, quantity) => {
    commerce.cart
      .add(productId, quantity)
      .then((item) => {
        setCart(item.cart);
      })
      .catch((err) => {
        console.error("There was an error adding the item to the cart", err);
      });
  };

  const handleUpdateCartQty = (lineItemId, quantity) => {
    commerce.cart
      .update(lineItemId, { quantity })
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((err) =>
        console.error("There was an error updating the cart items!!", err)
      );
  };

  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart
      .remove(lineItemId)
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((err) =>
        console.error("There was an error removing the item from the cart", err)
      );
  };

  const handleEmptyCart = () => {
    commerce.cart
      .empty()
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((err) =>
        console.error("There was an error emptying the cart", err)
      );
  };

  return (
    <div className="app">
      <h1>E-Commerce</h1>
      <ProductsList products={products} onAddToCart={handleAddToCart} />
      <CartNav
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onEmptyCart={handleEmptyCart}
      />
    </div>
  );
}

export default App;
