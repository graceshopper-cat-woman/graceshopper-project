import axios from 'axios'

//action type
const GET_USERS = 'GET_USERS'

//action creator
const _getUsers = users => ({
  type: GET_USERS,
  users
})

//THUNK CREATOR
export const getUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(_getUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//INITIAL STATE
let initialState = []

//REDUCER
export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
