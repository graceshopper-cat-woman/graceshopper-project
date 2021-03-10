import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    this.props.loadOrders(+this.props.match.params.userId)
    this.setState({isLoading: false})
  }
  render() {
    const orders = this.props.orders || []
    const loading = this.state.isLoading
    if (loading) {
      return (
        <div className="pageContainer">
          <h2>Loading...</h2>
        </div>
      )
    } else if (orders === undefined || orders.length === 0) {
      return <div>No orders</div>
    } else {
      return (
        <div>
          <h1>Your Orders</h1>
          {orders.map(order => (
            <div key={order.id}>
              <p>Order Number: {order.number}</p>
              <p>Date: {order.createdAt.slice(0, 10)} </p>
              <p>Status: {order.orderStatus}</p>
              <br />
            </div>
          ))}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: userId => dispatch(fetchOrders(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
