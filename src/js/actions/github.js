import $ from 'jquery'
import * as constants from '../constants'

const GITHUB_API = 'https://api.github.com'

export function fetchUser (options) {
  const { username } = options

  return dispatch => {
    $.get(`${GITHUB_API}/users/${username}`)
    .then(res => dispatch({
      type: constants.FETCH_USER,
      user: res
    }))
  }
}

export function fetchRepo (options) {
  const { username, repo } = options
  return dispatch => {
    $.get(`${GITHUB_API}/repos/${username}/${repo}`).then(res => {
      dispatch({
        type: constants.FETCH_REPO,
        repo: res
      })
    })
  };
}
