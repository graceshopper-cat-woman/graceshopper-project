import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="navDiv">
    <h1 className="logo">Hugs&Mugs</h1>
    <nav>
      {isLoggedIn ? (
        <>
          <div className="navLeft">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/users/"> Profile </Link>
            <Link to="/mugs"> View All </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            {isAdmin ? <Link to="/admin"> Admin Options </Link> : ''}
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
