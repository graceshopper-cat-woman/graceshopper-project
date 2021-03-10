import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class OrderConfirmation extends React.Component {
  render() {
    const user = this.props.user
    const order = this.props.order

    return (
      <div>
        <h1>
          {!user
            ? `Thank you for shopping with us!`
            : `Thank you for shopping with us, ${user.firstName}!`}
        </h1>
        <h1>{order ? `Your order number is ${order.items.number}` : ``}</h1>
        <Link className="cartViewTotal" id="continue" to="/mugs">
          Continue shopping?{' '}
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.cart,
    user: state.user
  }
}

export default connect(mapState, null)(OrderConfirmation)
