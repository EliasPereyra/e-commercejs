import { useState, useEffect } from 'react';

import ProductsList from './components/ProductsList'
import commerce from './lib/commerce';
import './styles/scss/styles.scss'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  const fetchProducts = () => {
    commerce.products.list().then((products) => {
      setProducts(products.data)
    }).catch((err) => {
      console.error("Error!!", err)
    })
  }

  const fetchCart = () => {
    commerce.cart.retrieve().then((cart) => {
      setCart(cart)
    }).catch((err) => {
      console.error("Error", err)
    })
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  },[])

  const handleAddToCart = (productId, quantity) => {
    commerce.cart.add(productId, quantity).then((item) => {
      setCart(item.cart)
    }).catch((err) => {
      console.error("There was an error adding the item to the cart", err)
    })
  }

  return (
    <div className="app">
      <h1>E-Commerce</h1>
      <ProductsList products={products} onAddToCart={handleAddToCart} />
    </div>
  );
}

export default App;
