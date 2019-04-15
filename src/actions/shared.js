import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveVotes } from './votes'
import { receiveQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
          		
          		/* todo : build normalized state : users, questions, votes */
          		const normalizedUsers = {}
                const normalizedVotes = {}
          		const normalizedQuestions = {}
          			
                const usersList = Object.values(users).map((u) => {
                  const {id, name, avatarURL} = u  // destructuring 
                  return {id, name, avatarURL}
                })
          		for (const user of usersList) {
                  normalizedUsers[user.id] = user
                }
          
          		let id  = 0
          		for (const user of Object.values(users)) {
                  for (const [question, vote] of Object.entries(user.answers)) {
                    id++
                    normalizedVotes[id] = {id, user:user.id, question, vote}
                  }
                }
          
          		const questionsList = Object.values(questions).map((q) => {
                  const {id, author, timestamp} = q  // destructuring 
                  return {id, author, timestamp, optionOne:q.optionOne.text, optionTwo:q.optionTwo.text}
                })
                for (const question of questionsList) {
                  normalizedQuestions[question.id] = question
                }
                        
                dispatch(receiveUsers(normalizedUsers))
                dispatch(receiveVotes(normalizedVotes))
          		dispatch(receiveQuestions(normalizedQuestions))
                dispatch(hideLoading())
            })
    }
}