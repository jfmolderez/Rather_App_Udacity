export const SET_ANSWERED = 'SET_ANSWERED'

export function setAnswered (answered) {
  return {
    type: SET_ANSWERED,
    answered,
  }
}