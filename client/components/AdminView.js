import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class AdminView extends Component {
  render() {
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

export default AdminView
