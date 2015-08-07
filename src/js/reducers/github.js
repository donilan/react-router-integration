import * as constants from '../constants'

const initialState = {}

export default function github (state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_USER:
      return action.user;
      break;
    default:
      return state
  }

}
