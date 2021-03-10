import React, {Component} from 'react'
import {addNewMug} from '../store/mug'
import {connect} from 'react-redux'
import MugForm from './MugForm'

const defaultState = {
  name: '',
  description: '',
  imageUrl: '../../images/defaultMugImage.jpg',
  price: 0,
  color: '',
  size: 0,
  inventory: 0
}

class AddMug extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const defaultMug = defaultState
    await this.props.createMug({...this.state})
    this.setState({defaultMug})
  }

  render() {
    return (
      <MugForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  () => {
    return {}
  },
  dispatch => {
    return {
      createMug: mug => dispatch(addNewMug(mug))
    }
  }
)(AddMug)
