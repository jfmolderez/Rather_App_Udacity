import { RECEIVE_QUESTIONS, 
    ADD_QUESTION, } from '../actions/questions'

export default function questions (state = {}, action) {
switch (action.type) {
case RECEIVE_QUESTIONS : 
  return {
    ...state,
    ...action.questions
 }
  
case ADD_QUESTION :
  const { question } = action 
  const { id, timestamp, author } = question
  const questionLight = { 
    id, 
    timestamp, 
    author, 
    optionOne : question.optionOne.text,
    optionTwo : question.optionTwo.text
  }

  return {
    ...state,
    [action.question.id] : questionLight
  }
 default : 
  return state
}
}