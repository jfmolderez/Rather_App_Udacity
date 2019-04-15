import { SET_ANSWERED } from '../actions/answered'

export default function answered (state = false, action) {
  switch (action.type) {
    case SET_ANSWERED : 
      return action.answered
     default : 
      return state
  }
}