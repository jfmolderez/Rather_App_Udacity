import { SET_UNKNOWNID } from '../actions/unknownId'

export default function unknownId (state = null, action) {
  switch (action.type) {
    case SET_UNKNOWNID : 
      return action.unknownId
     default : 
      return state
  }
}