import * as constants from '../constants'

const initialState = {}

export default function github (state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_USER:
      return {user: action.user};
      break;
    case constants.FETCH_REPO:
      return {repo: action.repo};
      break;
    default:
      return state
  }

}
