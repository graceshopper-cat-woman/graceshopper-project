import React from 'react'

export const SearchBar = ({keyword, onSearchChange}) => {
  return (
    <input
      className="searchBar"
      key="random1"
      value={keyword}
      placeholder="Search products"
      onChange={onSearchChange}
    />
  )
}

// const mapStateToProps = state => {
//   return {
//     orders: state.order.orders
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     loadOrders: userId => dispatch(fetchOrders(userId))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
