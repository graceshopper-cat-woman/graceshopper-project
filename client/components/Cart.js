import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, updateCart, removeItem, checkout} from '../store/cart'
import {Link} from 'react-router-dom'
import {CartItem} from './CartItem'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      stockError: []
    }
    this.setPrice = this.setPrice.bind(this)
    this.totalPrice = this.totalPrice.bind(this)
    this.onCheckout = this.onCheckout.bind(this)
    this.checkStock = this.checkStock.bind(this)
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
  checkStock() {
    let errorsArr = []
    const mugs = this.props.cart.mugs
    for (let i = 0; i < mugs.length; i++) {
      if (mugs[i].mugOrder.quantity > mugs[i].inventory) {
        errorsArr.push(
          `Oops! Only ${mugs[i].inventory} ${mugs[i].name} left in stock!`
        )
      }
    }
    this.setState({stockError: errorsArr})
  }

  async onCheckout() {
    await this.checkStock()
    console.log('ERRORS STATE-->', this.state.stockError)
    if (this.state.stockError.length === 0) {
      this.props.checkout(this.props.cart)
      this.props.history.push('/carts/order/confirmation')
    }
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
    } else if (
      cart.mugs === undefined ||
      cart === 'Cart is empty' ||
      cart.mugs.length === 0
    ) {
      return (
        <div className="pageContainer">
          <div className="emptyCartView">
            {/* <img src="../../public/images/empty-cart.png" alt="sad mug" /> */}
            <h3>Oh no! Your cart is currently empty :(</h3>
            <Link id="purpleLinkBtn" to="/mugs">
              {' '}
              Find your perfect mug{' '}
            </Link>
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
              <CartItem
                key={item.id}
                item={item}
                setPrice={this.setPrice}
                updateCart={this.props.updateCart}
                orderId={cart.id}
                loadCart={this.props.loadCart}
                removeItem={this.props.removeItem}
              />
            ))}
          </div>
          <p className="cartViewTotal">
            Total: ${this.totalPrice(cart.mugs).toFixed(2)}
          </p>
           <div className="cartBtnContainer">
               <Link id="purpleLinkBtn" to="/mugs">
            Continue shopping?{' '}
                </Link>
          <button id="tealBtn" type="button" onClick={this.onCheckout}>
            Checkout
          </button>
          {this.state.stockError.map((stockError, idx) => (
            <li key={idx}>{stockError}</li>
          ))}
          </div>
        </>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart.items
})

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    loadCart: () => dispatch(fetchCart()),
    updateCart: (orderId, quantity, mugId) => {
      dispatch(updateCart(orderId, quantity, mugId, history))
    },
    removeItem: (orderId, mugId) => {
      dispatch(removeItem(orderId, mugId, history))
    },
    checkout: cart => {
      dispatch(checkout(cart))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
