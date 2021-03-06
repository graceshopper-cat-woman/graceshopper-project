import axios from 'axios'

//action type
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

const getCart = cart => ({
  type: GET_CART,
  cart
})

const _addToCart = cart => ({
  type: ADD_TO_CART,
  cart
})

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

export const addToCart = (id, quantity) => {
  return async dispatch => {
    try {
      console.log(id, 'id', quantity, 'quantity')
      const {data} = await axios.post('/api/carts', {id, quantity})
      console.log(data)
      dispatch(_addToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//INITIAL STATE
let initialState = []

//REDUCER
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.cart]
    default:
      return state
  }
}
