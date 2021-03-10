import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class OrderConfirmation extends React.Component {
  render() {
    const user = this.props.user
    const cart = this.props.cart

    return (
      <div>
        <h1>
          {user.firstName && cart.number
            ? `Thank you for shopping with us, ${user.firstName}!`
            : `Thank you for shopping with us!`}
        </h1>
        <h1>{`Thank you for shopping with us! Your order number is ${
          cart.items.number
        }`}</h1>

        <Link className="cartViewTotal" id="continue" to="/mugs">
          Continue shopping?{' '}
        </Link>
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
