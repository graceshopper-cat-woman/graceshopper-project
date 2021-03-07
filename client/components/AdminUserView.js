import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/users'
import {Link} from 'react-router-dom'

class AdminUserView extends Component {
  componentDidMount() {
    this.props.loadUsers()
  }
  render() {
    const users = this.props.users
    console.log(users)
    if (users === undefined) {
      return (
        <div className="pageContainer">
          <h2>Loading...</h2>
        </div>
      )
    } else if (users.length > 0) {
      return (
        <div className="pageContainer">
          <div className="productContainer">
            {users.map(user => (
              <div className="productCard" key={user.id}>
                <h2 className="productStyle">
                  {user.firstName} {user.lastName}
                </h2>
                <h4 className="productStyle">{user.isAdmin ? 'ADMIN' : ''}</h4>
                <h4 className="productStyle">Email: {user.email}</h4>
                <h4 className="productStyle">
                  Shipping address:{' '}
                  {user.shippingStreet
                    ? user.shippingStreet +
                      '\n' +
                      user.shippingCity +
                      ',' +
                      user.shippingState +
                      user.shippingZip
                    : 'NA'}
                </h4>
                <h4 className="productStyle">
                  Billing address:{' '}
                  {user.billingStreet
                    ? user.billingStreet +
                      '\n' +
                      user.billingCity +
                      ',' +
                      user.billingState +
                      user.billingZip
                    : 'NA'}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return <div>No Users!</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUsers: () => dispatch(getUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserView)
