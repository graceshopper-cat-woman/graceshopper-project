import React from 'react'
import {connect} from 'react-redux'
import usStates from '../us-states'
import {fetchCart, checkout} from '../store/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadCart()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.checkout(this.props.order)
  }

  render() {
    const order = this.props.order
    return (
      <>
        <div className="checkout-form">
          <p>Please complete the form below to place your order.</p>
          <h3 className="shipping-info">Shipping Information</h3>
          <form className="order-form" onSubmit={this.handleSubmit}>
            <label htmlFor="firstName">
              <small>First Name: </small>
            </label>
            <input name="firstName" type="text" />

            <label htmlFor="lastName">
              <small>Last Name: </small>
            </label>
            <input name="lastName" type="text" />
            <label htmlFor="street">
              <small>Street: </small>
            </label>
            <input name="street" type="text" />

            <label htmlFor="city">
              <small>City: </small>
            </label>
            <input name="city" type="text" />

            <label htmlFor="state">
              State:
              <select onChange={this.handleChange}>
                {usStates.map(state => (
                  <option key={state.abbreviation} value={state}>
                    {state.name}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="zipCode">
              <small>Zip Code: </small>
            </label>
            <input name="zipCode" type="text" />

            <h3 className="billing information">Billing Information</h3>

            <label htmlFor="firstName">
              <small>First Name: </small>
            </label>
            <input name="firstName" type="text" />

            <label htmlFor="lastName">
              <small>Last Name: </small>
            </label>
            <input name="lastName" type="text" />
            <label htmlFor="street">
              <small>Street: </small>
            </label>
            <input name="street" type="text" />

            <label htmlFor="city">
              <small>City: </small>
            </label>
            <input name="city" type="text" />

            <label htmlFor="state">
              State:
              <select onChange={this.handleChange}>
                {usStates.map(state => (
                  <option key={state.abbreviation} value={state}>
                    {state.name}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="zipCode">
              <small>Zip Code: </small>
            </label>
            <input name="zipCode" type="text" />

            <button type="submit">Submit Order</button>
          </form>
        </div>
      </>
    )
  }
}

const mapState = state => ({
  order: state.cart.items
})

const mapDispatch = dispatch => {
  return {
    loadCart: () => dispatch(fetchCart()),
    checkout: order => dispatch(checkout(order))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
