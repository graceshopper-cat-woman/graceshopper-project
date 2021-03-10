import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {logout} from '../store'
import {fetchLoggedInUser} from '../store/user'

const Navbar = ({handleClick, isLoggedIn, isAdmin, user}) => {
  console.log('USER  ID-->', user.id)
  console.log('IS ADMIN-->', isAdmin)
  return (
    <div className="navDiv">
      <Link to="/">
        <h1 className="logo">Mugs&Hugs</h1>
      </Link>
      <nav>
        {isLoggedIn ? (
          <>
            <div className="navLeft">
              {/* The navbar will show these links after you log in */}
              <div className="dropdown">
                <FontAwesomeIcon id="user" icon="user-circle" />
                <div className="dropdown-content">
                  <Link to="/"> Edit Your Profile </Link>
                  <Link to={`/orders/user/${user.id}`}> Order History </Link>
                </div>
              </div>

              <Link to="/home">Home</Link>
              <Link to="/mugs"> View All </Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              {isAdmin ? (
                <div className="dropdown">
                  Admin Options
                  <div className="dropdown-content">
                    <Link to="/admin/mugs"> View Mugs </Link>
                    <Link to="/admin/users"> View Users </Link>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div>
              <Link to="/carts">
                <FontAwesomeIcon id="cart" icon={['fas', 'shopping-cart']} />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="navLeft">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/mugs"> View All </Link>
            </div>
            <div className="navRight">
              <Link to="/carts">
                <FontAwesomeIcon id="cart" icon={['fas', 'shopping-cart']} />
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    loadUser: userId => dispatch(fetchLoggedInUser(userId))
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object
}
