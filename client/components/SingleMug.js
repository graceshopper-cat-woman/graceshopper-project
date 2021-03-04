import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMug} from '../store/singleMug'
import {Link} from 'react-router-dom'

class SingleMug extends Component {
  componentDidMount() {
    console.log('SINGLE MUG COMPONENT DID MOUNT')
    this.props.loadMug(this.props.match.params.mugId)
  }
  render() {
    console.log(this.props)
    const mug = this.props.mug || {}
    if (!mug) {
      return <div>Loading...</div>
    }
    return (
      <>
        <div className="singleProductContainer">
          <div className="singleProductImage">
            <img src={mug.imageUrl} alt={mug.name} />
          </div>
          <div className="singleProductDescription">
            <h3 className="productStyle">{mug.name}</h3>
            <p>{mug.description}</p>
            <p>{mug.size} oz.</p>
            <p>${mug.price}</p>
            <form>
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" name="quantity" min="1" />
            </form>
            <button type="button">Add To Cart</button>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  mug: state.mug
})

const mapDispatchToProps = dispatch => ({
  loadMug: id => dispatch(fetchMug(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleMug)
