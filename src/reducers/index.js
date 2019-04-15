import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import authedUser from './authedUser'
import answered from './answered'
import unknownId from './unknownId'
import users from './users'
import votes from './votes'
import questions from './questions'

export default combineReducers ({
  authedUser,
  answered,
  unknownId,
  users,
  votes,
  questions,
  loadingBar: loadingBarReducer
})