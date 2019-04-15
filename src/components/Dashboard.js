import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionLink from './QuestionLink'
import { setAnswered } from '../actions/answered'

class Dashboard extends Component {
  
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(setAnswered(false))
  }
  
  setFilter = () => {
 	const {answered, dispatch} = this.props
    dispatch(setAnswered(!answered))
  }

  render () {
    // console.log(`answered by ${this.props.authedUser}: `, this.props.questionIds_a)
	// console.log('unanswered : ', this.props.questionIds_na)
    
    const { questionIds_a, questionIds_na, authedUser, answered } = this.props
    const questionIds = answered ? questionIds_a : questionIds_na

	if (authedUser === null) {
      return <Redirect to='/signin' />
	} 
      
    return (
    	<div>	
      		<div className="answer-filter">
      			<button onClick={this.setFilter} disabled={!answered}>Unanswered Questions</button>
      			<button onClick={this.setFilter} disabled={answered}>Answered Questions</button>
      		</div>
      		<ul className='dashboard-list'>
      			{questionIds.map((qid) => (
      				<li key={qid}>
      					<QuestionLink qid={qid} />
     				</li>
      			))}
      		</ul>
    	</div>
      )
  }
}

function mapStateToProps ({ questions, votes, authedUser, answered }) {

  const questionIds_a = Object.keys(questions)
  							.filter((k) => {
                              const relevantVotes = 
                                    Object.values(votes).filter((vote) => vote.question === k && vote.user === authedUser)
                              return relevantVotes.length > 0 })
                            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  
  const questionIds_na = Object.keys(questions)
  							.filter((k) => questionIds_a.indexOf(k) < 0)
  							.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  return {
    questionIds_a, questionIds_na, authedUser, answered
  }
}

export default connect(mapStateToProps)(Dashboard)
