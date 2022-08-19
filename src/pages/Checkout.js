import { useState, useEffect } from 'react'

import commerce from '../lib/commerce'

function Checkout({ cart }) {
  const defaultState = {
    checkoutToken: {},
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@hotmail.com",
    // Shipping Details
    shippingName: "Jane Doe",
    shippingStreet: "123 Fake st.",
    shippingCity: "San Francisco",
    shippingStateProvince: "CA",
    shippingPostalZipCode: "94107",
    shippingCountry: "US",
    // payment details
    cardNum: "4242 4242 4242",
    expMonth: "11",
    expYear: "2023",
    ccv: "123",
    // shipping and fulfillment data
  }

  const [checkoutToken, setCheckoutToken] = useState({})
  const [shippingCountries, setShippingCountries] = useState({})
  const [shippingSubDivisions, setShippingSubDivisions] = useState({})
  const [shippingOption, setShippingOption] = useState("")
  const [shippingOptions, setShippingOptions] = useState([])

  const fetchShippingCountries = (checkoutTokenId) => {
    commerce.services.localeListShippingCountries(checkoutTokenId).then((countries) => {
      setShippingCountries({ shippingCountries: countries.countries })
    }).catch((err) => console.error("There was an error fetching a list of shipping countries", err))
  }

  const fetchSubDivisions = (countryCode) => {
    commerce.services.localeListSubdivisions(countryCode).then((subdivisions) => {
      setShippingSubDivisions({ shippingSubDivisions: subdivisions.subdivisions })
    }).catch((err) => console.error("There was an error fetching the subdivisions", err))
  }

  const fetchShippingOptions = (checkoutTokenId, country, stateOfProvince = null) => {
    commerce.checkout.getShippingOptions(checkoutTokenId,
      {
        country: country,
        region: stateOfProvince
      }).then((options) => {
        const shippingOption = options[0] || null
        setShippingOption(shippingOption)
        setShippingOptions(options)
      }).catch((err) => console.error("There was an error fetching the shipping methods", err))
  }

  const genereateCheckoutToken = () => {
    if (cart.line_items.length) {
      commerce.checkout.generateToken(cart.id, { type: 'cart' })
        .then((token) => {
          setCheckoutToken(token)
        })
        .then(() => {
          fetchShippingCountries(checkoutToken.id)
        })
        .catch((err) => console.error("There was an error generating a token", err))
    }
  }

  useEffect(() => {
    genereateCheckoutToken()
  }, [])

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id, defaultState.shippingCountry)
  }, [])

  const checkoutForm = () => {
    return (
      <form className="checkout__form">
        <div>
          <h4 className="checkout__subheading">Customer Information</h4>

          <label className="checkout__label" htmlFor="firstName">First Name</label>
          <input className="checkout__input" type="text" value={defaultState.firstName} name="firstName" placeholder="Insert your first name" required />

          <label className="checkout__label" htmlFor="lastName">Last Name</label>
          <input className="checkout__input" type="text" value={defaultState.lastName} name="lastName" placeholder="Insert your last name" required />

          <label className="checkout__label" htmlFor="email">Email</label>
          <input className="checkout__input" type="email" value={defaultState.email} name="email" placeholder="Insert your email address" required />
        </div>

        <div>
          <h4 className="checkout__subheading">Shipping Details</h4>

          <label className="checkout__label" htmlFor="fullName">Full Name</label>
          <input className="checkout__input" type="text" value={defaultState.shippingName} name="fullName" placeholder="Insert your shipping full name" required />

          <label className="checkout__label" htmlFor="streetAddress">Street Address</label>
          <input className="checkout__input" type="text" value={defaultState.shippingStreet} name="shippingStreet" placeholder="Insert your shipping street address" required />

          <label className="checkout__label" htmlFor="shippingCity">City</label>
          <input className="checkout__input" type="text" value={defaultState.shippingCity} name="shippingCity" placeholder="Insert your shipping City" required />

          <label className="checkout__label" htmlFor="shippingPostalZipCode">Postal/Zip Code</label>
          <input className="checkout__input" type="text" value={defaultState.shippingPostalZipCode} name="shippingPostalZipCode" placeholder="Insert your shipping Postal/Zip Code" required />
        </div>

        <div>
          <h4 className="checkouut__subheading">Payment Information</h4>

          <label className="checkout__label" htmlFor="cardNum">Credit Card Number</label>
          <input className="checkout__input" type="text" value={defaultState.cardNum} name="cardNum" placeholder="Insert your Credit Card Number" required />

          <label className="checkout__label" htmlFor="expMonth">Expiry Month</label>
          <input className="checkout__input" type="text" value={defaultState.expMonth} name="expMonth" placeholder="Credit Card Expiry Month" required />

          <label className="checkout__label" htmlFor="expYear">Expiry Year</label>
          <input className="checkout__input" type="text" value={defaultState.expYear} name="expYear" placeholder="Credit Card Expiry Year" required />

          <label className="checkout__label" htmlFor="ccv">CCV</label>
          <input className="checkout__input" type="text" value={defaultState.ccv} name="ccv" placeholder="CCV (3 digits)" />

          <button className="checkout__btn-confirm">Confirm Order</button>
        </div>

      </form>
    )
  }

  return (
    <div>
      {checkoutForm()}
    </div>
  )
}

export default Checkout
