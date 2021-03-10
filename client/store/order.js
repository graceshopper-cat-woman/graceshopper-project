import axios from 'axios'

//action type
const GET_ORDERS = 'GET_ORDERS'

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

//THUNK CREATOR
export const fetchOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/user/${userId}`)
      dispatch(getOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//INITIAL STATE
let initialState = {
  orders: []
}

//REDUCER
export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}
