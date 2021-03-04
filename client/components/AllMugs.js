import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMugs} from '../store/mug'
import {Link} from 'react-router-dom'

class AllMugs extends Component {
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
              <Link className="productStyle" to={`/mugs/${mug.id}`}>
                <img alt={mug.name} src={mug.imageUrl} />
                <h3 className="productStyle">{mug.name}</h3>
              </Link>
              <h4 className="productStyle">${mug.price}</h4>
              <form>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" min="1" />
              </form>
              <button className="productButton" type="button">
                Add To Cart
              </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllMugs)
