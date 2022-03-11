import PropsTypes from 'prop-types'
import {stripHtml} from "string-strip-html"

function ProductItem({ product, onAddToCart }) {
  const { result } = stripHtml(product.description)

  const handleAddToCart = () => {
    onAddToCart(product.id, 1)
  }
  
  return (
    <div className="product__name">
      <img className="product__image" src={product.image.url} alt={product.name} />
      {/* product info */}
      <div className="product__info">
        <h4 className="product__name">{product.name}</h4>
        <p className="product__description">
          {/* product description stripped of html tags */}
          {result}
        </p>
        {/* product details */}
        <div className="product__details">
          <p className="product__price">{product.price.formatted_with_symbol}</p>
        </div>
        <button className="product__btn" name="Add to cart" onClick={handleAddToCart}>Quick Add</button>
      </div>
    </div>
  )
}

ProductItem.protoTypes = {
  product: PropsTypes.object
}

export default ProductItem