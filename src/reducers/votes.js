import { RECEIVE_VOTES } from '../actions/votes'
import { ADD_VOTE } from '../actions/votes'

export default function votes (state = {}, action) {
  switch (action.type) {
    case RECEIVE_VOTES : 
      return {
        ...state,
        ...action.votes
      }
    case ADD_VOTE :
      const { vote } = action 
      return {
        ...state,
        [action.vote.id]:vote
      }
      
     default : 
      return state
  }
}