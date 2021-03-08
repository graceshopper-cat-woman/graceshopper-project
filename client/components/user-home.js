import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Landing} from './Landing'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName} = props

  return (
    <>
      <div>
        <Landing firstName={firstName} />
      </div>
    </>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string
}
