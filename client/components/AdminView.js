import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMugs, deleteMug} from '../store/mug'
import AdminMugView from './AdminMugView'
import AdminUserView from './AdminUserView'
import {Link} from 'react-router-dom'

class AdminView extends Component {
  constructor() {
    super()
    this.viewChange = this.viewChange.bind(this)
    this.state = {viewingMugs: true}
  }
  viewChange() {
    if (this.state.viewingMugs) {
      this.setState({viewingMugs: false})
    } else {
      this.setState({viewingMugs: true})
    }
  }
  componentDidMount() {
    this.props.loadMugs()
  }
  render() {
    if (this.props.mugs === undefined) {
      return (
        <div className="pageContainer">
          <h2>Loading...</h2>
        </div>
      )
    }
    return (
      <div className="pageContainer">
        <Link to="/admin/users">
          <button
            className="productButton"
            type="button"
            onClick={this.viewChange}
          >
            View Users
          </button>
        </Link>
        <Link to="/admin/mugs">
          <button
            className="productButton"
            type="button"
            onClick={this.viewChange}
          >
            View Mugs
          </button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mugs: state.mugs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMugs: () => dispatch(fetchMugs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminView)
