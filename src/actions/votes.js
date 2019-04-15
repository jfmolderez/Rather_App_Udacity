import { saveQuestionAnswer } from '../utils/api'
import { setAnswered } from './answered.js'
//import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_VOTES = 'RECEIVE_VOTES'
export const ADD_VOTE = 'ADD_VOTE'

export function receiveVotes (votes) {
    return {
        type: RECEIVE_VOTES,
        votes,
    }
}

function addVote (vote) {
  return {
    type: ADD_VOTE,
    vote
  }
}

export function handleAddVote (vote) {
  console.log('handleAddVote  - vote = ', vote)
  return (dispatch, getState) => {
    // dispatch(showLoading())
    return saveQuestionAnswer({
      authedUser: vote.user,
      qid: vote.question,
      answer: vote.vote
    })
    .then(() => dispatch(addVote(vote)))
    .then(() => dispatch(setAnswered(true)))
    //.then(() => dispatch(hideLoading()))
	}
}
