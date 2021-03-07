import axios from 'axios'

//action type
const GET_MUGS = 'GET_MUGS'
const DELETE_MUG = 'DELETE_MUG'
const UPDATE_MUG = 'UPDATE_MUG'
const ADD_MUG = 'ADD_MUG'

const getMugs = mugs => ({
  type: GET_MUGS,
  mugs
})

const createMug = mug => {
  return {
    type: ADD_MUG,
    mug
  }
}

const removeMug = mug => {
  return {
    type: DELETE_MUG,
    mug
  }
}

const editMug = mug => {
  return {
    type: UPDATE_MUG,
    mug
  }
}

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

export const addNewMug = mug => {
  return async dispatch => {
    const {data} = await axios.post('/api/mugs', mug)
    dispatch(createMug(data))
  }
}

export const deleteMug = mug => {
  return async dispatch => {
    await axios.delete(`/api/mugs/${mug.id}`)
    dispatch(removeMug(mug))
  }
}

export const updateMug = mug => {
  return async dispatch => {
    const {data} = await axios.put(`/api/mugs/${mug.id}`, mug)
    dispatch(editMug(data))
  }
}

//INITIAL STATE
let initialState = []

//REDUCER
export default function mugReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MUGS:
      return action.mugs
    case ADD_MUG:
      return [...state, action.mug]
    case DELETE_MUG:
      return state.filter(mug => mug.id !== action.mug.id)
    case UPDATE_MUG:
      return state.map(mug => {
        if (mug.id === action.mug.id) {
          mug = action.mug
        }
      })
    default:
      return state
  }
}
