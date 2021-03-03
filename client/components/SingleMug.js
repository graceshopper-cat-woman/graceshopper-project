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
      <div>
        <div>
          <img src={mug.imageUrl} alt={mug.name} />
          <span>{mug.name}</span>
          <span>{mug.description}</span>
          <span>{mug.size} oz.</span>
          <span>${mug.price}</span>
          <button type="button">Add To Cart</button>
          <form>
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" min="1" />
          </form>
        </div>
      </div>
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
