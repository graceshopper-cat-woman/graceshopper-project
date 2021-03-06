import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMugs} from '../store/mug'
import {Link} from 'react-router-dom'

class AdminMugView extends Component {
  componentDidMount() {
    this.props.loadMugs()
  }
  render() {
    console.log(this.props)
    if (this.props.mugs === undefined) {
      return (
        <div className="pageContainer">
          <h2>Loading...</h2>
        </div>
      )
    }
    return (
      <div className="pageContainer">
        <div className="productContainer">
          {this.props.mugs.map(mug => (
            <div className="productCard" key={mug.id}>
              <img id="productPhoto" alt={mug.name} src={mug.imageUrl} />
              <h3 className="productStyle">{mug.name}</h3>
              <h4 className="productStyle">${mug.price}</h4>
              <form>
                <label htmlFor="Name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={mug.name}
                />
                <br />
                <label htmlFor="Price">Price:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  defaultValue={mug.price}
                />
                <br />
                <label htmlFor="Inventory">Inventory:</label>
                <input
                  type="text"
                  id="inventory"
                  name="inventory"
                  defaultValue={mug.inventory}
                />
                <br />
              </form>
              <Link to={`/admin/edit/${mug.id}`}>
                <button className="productButton" type="button">
                  Modify Mug
                </button>
              </Link>
            </div>
          ))}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminMugView)
