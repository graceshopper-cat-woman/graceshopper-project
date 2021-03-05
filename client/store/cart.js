import axios from 'axios'
//action type
const GET_CART = 'GET_CART'

const getCart = cart => ({
  type: GET_CART,
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

//INITIAL STATE
let initialState = []

//REDUCER
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
