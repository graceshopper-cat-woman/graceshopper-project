import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMug} from '../store/singleMug'
import {updateMug, deleteMug} from '../store/mug'
import MugForm from './MugForm'
import {Link} from 'react-router-dom'

const defaultState = {
  name: '',
  description: '',
  imageUrl: 'https://dummyimage.com/300x300/000/fff',
  price: 0,
  color: '',
  size: 0,
  inventory: 0,
  id: 0
}
let modified = false

class AdminModifyMug extends Component {
  constructor() {
    super()
    this.setPrice = this.setPrice.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = defaultState
  }
  async componentDidMount() {
    await this.props.loadMug(this.props.match.params.mugId)
    this.setState({
      name: this.props.mug.name,
      description: this.props.mug.description,
      imageUrl: this.props.mug.imageUrl,
      price: this.props.mug.price,
      color: this.props.mug.color,
      size: this.props.mug.size,
      inventory: this.props.mug.inventory,
      id: this.props.mug.id
    })
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
    this.props.updateMug(this.state)
    modified = true
    this.setState({defaultState})
  }
  handleDelete(evt) {
    evt.preventDefault()
    const deletedMug = this.state
    deletedMug.id = this.props.mug.id
    this.props.deleteMug(deletedMug)
    this.setState({defaultState})
  }
  render() {
    const mug = this.props.mug
    console.log(this.state)
    if (!mug) {
      return <div>Loading...</div>
    }
    return (
      <>
        <div className="singleProductContainerADMIN">
          <div className="singleProductImageADMIN">
            <img
              className="singleProductImageADMIN"
              src={`../${mug.imageUrl}`}
              alt={mug.name}
            />
          </div>
          <div className="singleProductDescriptionADMIN">
            <h3 className="productStyle">{mug.name}</h3>
            <p>{mug.description}</p>
            <p>{mug.size} oz.</p>
            <p>${this.setPrice(mug.price)}</p>
          </div>
        </div>
        <form id="mug-form" onSubmit={this.handleSubmit}>
          <label htmlFor="mugName">Mug Name:</label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <br />

          <label htmlFor="description">Mug Description:</label>
          <input
            name="description"
            type="text"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <br />

          <label htmlFor="imageUrl">Mug Image Url:</label>
          <input
            name="imageUrl"
            type="text"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />
          <br />

          <label htmlFor="price">Mug Price(In dollars and cents):</label>
          <input
            name="price"
            type="text"
            onChange={this.handleChange}
            value={this.state.price}
          />
          <br />

          <label htmlFor="color">Mug Color:</label>
          <input
            name="color"
            type="text"
            onChange={this.handleChange}
            value={this.state.color}
          />
          <br />

          <label htmlFor="size">Mug Size (oz):</label>
          <input
            name="size"
            type="text"
            onChange={this.handleChange}
            value={this.state.size}
          />
          <br />

          <label htmlFor="inventory">Mug Inventory (# of):</label>
          <input
            name="inventory"
            type="text"
            onChange={this.handleChange}
            value={this.state.inventory}
          />
          <br />

          <button type="submit">Submit</button>
        </form>
        {modified && <h4>Mug Updated!</h4>}
        <Link to="/admin">
          <button
            className="productButton"
            type="button"
            onClick={this.handleDelete}
          >
            Delete Mug
          </button>
        </Link>
      </>
    )
  }
}

const mapStateToProps = state => ({
  mug: state.mug
})

const mapDispatchToProps = dispatch => ({
  loadMug: id => dispatch(fetchMug(id)),
  updateMug: mug => dispatch(updateMug(mug)),
  deleteMug: mug => dispatch(deleteMug(mug))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminModifyMug)
