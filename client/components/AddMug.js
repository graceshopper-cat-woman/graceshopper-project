import React, {Component} from 'react'
import {addNewMug} from '../store/mug'
import {connect} from 'react-redux'

const defaultState = {
  name: '',
  description: '',
  imageUrl: 'https://dummyimage.com/300x300/000/fff',
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
      //form
      <div>Under Construction</div>
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
