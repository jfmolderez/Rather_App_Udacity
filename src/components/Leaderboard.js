import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Score from './Score'

class Leaderboard extends Component {
    
  render () {
    const { scores, userIds, authedUser } = this.props
    
    if (authedUser === null) {
      return <Redirect to='/signin' />
	} 
      
    return (
      <ul className='leaderboard'>
     	{userIds.map((userId) => (
      				<li key={userId}>
      					<Score userId={userId} score={scores[userId]}/>
     				</li> ))}
     </ul> 
	)}
}

function mapStateToProps ({ users, votes, questions, authedUser }) {
  	const scores = {}
    for (const userId of Object.keys(users)) {
      const nVotes = (Object.values(votes).filter((v) => v.user === userId)).length
      const nQuestions = (Object.values(questions).filter((q) => q.author === userId)).length
      scores[userId] = [nVotes, nQuestions, nVotes + nQuestions]
    }
    const userIds = Object.keys(users)
    	.sort((a, b) => scores[b][2] - scores[a][2])
	return {
      scores, userIds, authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard)