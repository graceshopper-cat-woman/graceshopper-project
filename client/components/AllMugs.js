import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMugs} from '../store/mug'

class AllMugs extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadMugs()
  }
  render() {
    return (
      <div>
        {this.props.mugs.map(mug => (
          <div key={mug.id}>
            <img alt={mug.name} src={mug.imageUrl} />
            <li>{mug.name}</li>
            <li>${mug.price}</li>
          </div>
        ))}
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
