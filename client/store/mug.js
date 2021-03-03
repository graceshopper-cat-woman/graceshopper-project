import axios from 'axios'

//action type
const GET_MUGS = 'GET_MUGS'
const GET_SINGLE_MUG = 'GET_SINGLE_MUG'

const getMugs = mugs => ({
  type: GET_MUGS,
  mugs
})

//THUNK CREATOR
export const fetchMugs = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/mugs')
      dispatch(getMugs(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//INITIAL STATE
let initialState = []

//REDUCER
export default function mugReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MUGS:
      return [...state, action.mugs]
    default:
      return state
  }
}
