export const SET_UNKNOWNID = 'SET_UNKNOWNID'

export function setUnknownId (unknownId) {
  return {
    type: SET_UNKNOWNID,
    unknownId,
  }
}
