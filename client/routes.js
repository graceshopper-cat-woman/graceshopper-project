import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  UserHome,
  AllMugs,
  SingleMug,
  Landing,
  AdminView,
  AddMug,
  AdminModifyMug,
  Cart,
  SignupForm
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignupForm} />
        <Route exact path="/mugs" component={AllMugs} />
        <Route exact path="/mugs/:mugId" component={SingleMug} />
        <Route exact path="/carts" component={Cart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/mugs" component={AllMugs} />
            <Route exact path="/mugs/:mugId" component={SingleMug} />
            <Route exact path="/carts" component={Cart} />
            {isAdmin ? (
              <Switch>
                <Route exact path="/admin" component={AdminView} />
                <Route exact path="/admin/add/" component={AddMug} />
                <Route
                  exact
                  path="/admin/edit/:mugId"
                  component={AdminModifyMug}
                />
              </Switch>
            ) : (
              ''
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
