import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'
import {CartItem} from './CartItem'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
    this.setPrice = this.setPrice.bind(this)
    this.totalPrice = this.totalPrice.bind(this)
  }
  setPrice(number) {
    return (number / 100).toFixed(2)
  }
  totalPrice(items) {
    return items.reduce(
      (total, item) =>
        total + this.setPrice(item.price) * item.mugOrder.quantity,
      0
    )
  }

  componentDidMount() {
    this.props.loadCart()
    this.setState({isLoading: false})
  }
  render() {
    const cart = this.props.cart || []
    const loading = this.state.isLoading
    if (loading) {
      return <div>Loading...</div>
    } else if (cart.mugs === undefined || cart === 'Cart is empty') {
      return (
        <div className="pageContainer">
          <div className="emptyCartView">
            <img src="../../public/images/empty-cart.png" alt="sad mug" />
            <h3>Oh no! Your cart is currently empty :(</h3>
            <Link to="/mugs"> Find your perfect mug </Link>
          </div>
        </div>
      )
    } else {
      return (
        <>
          <div className="cartViewItems">
            <div className="cartViewHeaders">
              <h3 className="cartViewHeadersText"> Item </h3>
              <h3 className="cartViewHeadersText"> Quantity </h3>
              <h3 className="cartViewHeadersText"> Subtotal </h3>
            </div>
            {cart.mugs.map(item => (
              <CartItem key={item.id} item={item} setPrice={this.setPrice} />
            ))}
          </div>
          <p className="cartViewTotal">
            Total: ${this.totalPrice(cart.mugs).toFixed(2)}
          </p>
          <Link className="cartViewTotal" id="continue" to="/mugs">
            Continue shopping?{' '}
          </Link>
        </>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart.items
})

const mapDispatchToProps = dispatch => {
  return {
    loadCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
