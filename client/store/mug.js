import axios from 'axios'

//action type
const GET_MUGS = 'GET_MUGS'
const GET_SINGLE_MUG = 'GET_SINGLE_MUG'

const getMugs = mugs => ({
  type: GET_MUGS,
  mugs
})

const getSingleMug = mug => ({
  type: GET_SINGLE_MUG,
  mug
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
let initialState = []

//REDUCER
export default function mugReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MUGS:
      return action.mugs
    case GET_SINGLE_MUG:
      return action.mug
    default:
      return state
  }
}
