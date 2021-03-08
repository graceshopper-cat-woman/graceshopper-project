import axios from 'axios'

//action type
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'
// const UPDATE_CART = 'UPDATE_CART'

const getCart = cart => ({
  type: GET_CART,
  cart
})

const _addToCart = cart => ({
  type: ADD_TO_CART,
  cart
})

const _deleteItem = itemId => ({
  type: DELETE_ITEM,
  itemId
})

// const _updateCart = (updatedCart) => ({
//   type: UPDATE_CART,
//   updatedCart,
// })
//THUNK CREATOR
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/carts')
      dispatch(getCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToCart = (quantity, mugId, mugPrice) => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/carts/add', {
        quantity: quantity,
        mugId: mugId,
        mugPrice: mugPrice
      })
      console.log(data)
      dispatch(_addToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCart = (orderId, quantity, mugId, history) => {
  return async () => {
    try {
      console.log('TRYING UPDATE CART FUNC')
      const {data} = await axios.put('/api/carts', {
        orderId: orderId,
        quantity: quantity,
        mugId: mugId
      })
      if (!data) {
        console.log('NO DATA FOUND')
      }
      // fetchCart()
      // dispatch(_updateCart(data))
      if (data) {
        history.push('/carts')
      }
    } catch (error) {
      console.log('ERROR', error)
    }
  }
}

//Delete Button inside cart view
export const removeItem = (orderId, mugId, history) => {
  console.log('ATTEMPTING TO DELETE CART')
  console.log('DELETE THUNK ORDERID', orderId, mugId)
  return async dispatch => {
    try {
      const {data} = await axios.put('api/carts/delete', {
        orderId: orderId,
        mugId: mugId
      })
      console.log('ITEM ID: ', data)
      dispatch(_deleteItem(data))
      history.push('/carts')
    } catch (error) {
      console.error(error)
    }
  }
}

//INITIAL STATE
let initialState = {
  items: []
}

//REDUCER
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, items: action.cart}
    case ADD_TO_CART:
      return {...state, items: action.cart}
    case DELETE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          mugs: state.items.mugs.filter(item => item.id !== +action.itemId)
        }
      }
    default:
      return state
  }
}
