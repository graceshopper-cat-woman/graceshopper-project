import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class OrderConfirmation extends React.Component {
  render() {
    const user = this.props.user
    const cart = this.props.cart

    return (
      <div className="pageContainer">
        <div className="emptyCartView">
          <h1>
            {user.firstName
              ? `Thank you for shopping with us, ${user.firstName}!`
              : `Thank you for shopping with us!`}
          </h1>
          <h1>
            {cart.items.number
              ? `Your order number is ${cart.items.number}`
              : ``}
          </h1>

          <Link className="cartViewTotal" id="continue" to="/mugs">
            Continue shopping?{' '}
          </Link>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

export default connect(mapState, null)(OrderConfirmation)
