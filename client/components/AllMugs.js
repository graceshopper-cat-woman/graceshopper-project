import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMugs} from '../store/mug'
import {Link} from 'react-router-dom'
import {SearchBar} from './SearchBar'

class AllMugs extends Component {
  constructor() {
    super()
    this.state = {
      keyword: ''
    }
    this.setPrice = this.setPrice.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.dynamicSearch = this.dynamicSearch.bind(this)
  }
  componentDidMount() {
    this.props.loadMugs()
  }
  setPrice(number) {
    return (number / 100).toFixed(2)
  }
  onSearchChange(evt) {
    this.setState({
      keyword: evt.target.value
    })
  }
  dynamicSearch(products) {
    return products.filter(
      product =>
        product.name.toLowerCase().includes(this.state.keyword.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(this.state.keyword.toLowerCase())
    )
  }

  render() {
    let filteredMugs
    if (this.props.mugs === undefined) {
      return (
        <div className="pageContainer">
          <h2>Loading...</h2>
        </div>
      )
    } else {
      filteredMugs = this.dynamicSearch(this.props.mugs)
    }
    return (
      <div className="pageContainer">
        <SearchBar
          keyword={this.state.keyword}
          onSearchChange={this.onSearchChange}
        />
        <div className="productContainer">
          {filteredMugs.map(mug => (
            <div className="productCard" key={mug.id}>
              <Link className="productStyle" to={`/mugs/${mug.id}`}>
                <img id="productPhoto" alt={mug.name} src={mug.imageUrl} />
                <h3 className="productStyle">{mug.name}</h3>
              </Link>
              <h4 className="productStyle">${this.setPrice(mug.price)}</h4>
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
