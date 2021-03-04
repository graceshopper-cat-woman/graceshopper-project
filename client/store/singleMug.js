import axios from 'axios'

//ACTION TYPE
const GET_SINGLE_MUG = 'GET_SINGLE_MUG'

//ACTION CREATER
const getSingleMug = mug => ({
  type: GET_SINGLE_MUG,
  mug
})

//THUNK CREATOR
export const fetchMug = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/mugs/${id}`)
      dispatch(getSingleMug(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//INITIAL STATE
let initialState = {}

//REDUCER
export default function singleMugReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_MUG:
      return action.mug
    default:
      return state
  }
}
