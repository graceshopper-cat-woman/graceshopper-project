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
  inventory: 0
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
    const newMug = this.state
    newMug.id = this.props.mug.id
    this.props.updateMug(newMug)
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
    const mug = this.props.mug || {}
    if (!mug) {
      return <div>Loading...</div>
    }
    return (
      <>
        <div className="singleProductContainer">
          <div className="singleProductImage">
            <img src={`../${mug.imageUrl}`} alt={mug.name} />
          </div>
          <div className="singleProductDescription">
            <h3 className="productStyle">{mug.name}</h3>
            <p>{mug.description}</p>
            <p>{mug.size} oz.</p>
            <p>${this.setPrice(mug.price)}</p>
          </div>
        </div>
        <MugForm
          name={mug.name}
          description={mug.description}
          imageUrl={`../${mug.imageUrl}`}
          price={mug.price}
          color={mug.color}
          size={mug.size}
          inventory={mug.inventory}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
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
