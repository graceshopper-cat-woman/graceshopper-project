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
    console.log('COMPONENT MOUNTED')
    console.log('MOUNTED STATE', this.state.isLoading)
  }
  render() {
    console.log('ISLOADING RENDER -->', this.state.isLoading)
    const cart = this.props.cart || []
    console.log('CART--->', cart)
    const loading = this.state.isLoading
    if (loading) {
      return <div>Loading...</div>
    } else if (
      (!loading && cart.length === 0) ||
      (!loading && cart === 'Cart is empty')
    ) {
      return <div>Cart is Empty</div>
    } else {
      return (
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <Link to={`/mugs/${item.id}`}>
                <span>Item: {item.name}</span>
              </Link>
              <span>Qty:{item.quantity}</span>
              <span>Price: {this.setPrice(item.quantity)}</span>
            </div>
          ))}
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => {
  return {
    loadCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
