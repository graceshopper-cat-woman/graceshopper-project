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
                <h3 className="productStyle">
                  {user.firstName} {user.lastName}
                </h3>
                <h4 className="productStyle">{user.email}</h4>
                <h4 className="productStyle">
                  {user.isAdmin
                    ? `${user.firstName} has administrator privileges`
                    : `${
                        user.firstName
                      } does not have administrator privileges`}
                </h4>
                <h4 className="productStyle">
                  {user.firstName} shipping address: {user.shippingStreet}{' '}
                  {user.shippingCity}, {user.shippingState} {user.shippingZip}
                </h4>
                <h4 className="productStyle">
                  {user.firstName} billing address: {user.billingStreet}{' '}
                  {user.billingCity}, {user.billingCity} {user.billingZip}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )
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
