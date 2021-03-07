import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMug} from '../store/singleMug'
import {addToCart} from '../store/cart'
import {Link} from 'react-router-dom'

class SingleMug extends Component {
  constructor() {
    super()
    this.setPrice = this.setPrice.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      quantity: 1,
      added: false
    }
  }
  componentDidMount() {
    this.props.loadMug(this.props.match.params.mugId)
  }
  setPrice(number) {
    return (number / 100).toFixed(2)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addToCart(
      this.state.quantity,
      +this.props.match.params.mugId,
      this.props.mug.price
    )
    this.setState({quantity: 1, added: true})
  }
  render() {
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
            <h3 className="singleProductStyle">{mug.name}</h3>
            <p className="singleProductStyle">{mug.description}</p>
            <p className="singleProductStyle">Size: {mug.size} oz.</p>
            <p className="singleProductStyle">${this.setPrice(mug.price)}</p>
            <form className="singleProductStyle" onSubmit={this.handleSubmit}>
              <label className="singleProductStyle" htmlFor="quantity">
                Quantity:
              </label>
              <input
                className="singleProductStyle"
                type="number"
                id="quantity"
                name="quantity"
                value={this.state.quantity}
                min="1"
                onChange={this.handleChange}
              />
              <button type="submit">Add To Cart</button>
            </form>
            {this.state.added ? <p>Added to cart!</p> : ''}
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
  loadMug: id => dispatch(fetchMug(id)),
  addToCart: (quantity, mugId, mugPrice) =>
    dispatch(addToCart(quantity, mugId, mugPrice))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleMug)
