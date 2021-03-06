import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
    this.setPrice = this.setPrice.bind(this)
  }
  setPrice(number) {
    return (number / 100).toFixed(2)
  }

  componentDidMount() {
    this.props.loadCart()
    this.setState({isLoading: false})
  }
  render() {
    const cart = this.props.cart || []
    console.log('CART--->', cart)
    const loading = this.state.isLoading
    if (loading) {
      return <div>Loading...</div>
    } else if (cart.mugs === undefined || cart === 'Cart is empty') {
      return <div>Cart is Empty</div>
    } else {
      return (
        <>
          <div>
            {cart.mugs.map(item => (
              <div key={item.id}>
                <Link to={`/mugs/${item.id}`}>
                  <span>Item: {item.name}</span>
                </Link>
                <span>Qty:{item.mugOrder.quantity}</span>
                <span>
                  Price: ${this.setPrice(item.price) * item.mugOrder.quantity}
                </span>
              </div>
            ))}
          </div>
          <Link to="/mugs">Continue shopping? </Link>
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
