import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'
import { handleAddVote } from '../actions/votes'
import { setUnknownId } from '../actions/unknownId'

class Question extends Component {

  state = {
    selectedOption : 'optionOne'
  }
  
  handleSubmit = (event)  => {
        event.preventDefault()
    	this.setState({submitted : true})
        const { vote, dispatch } = this.props 
        const { selectedOption } = this.state
        vote['vote'] = selectedOption
        dispatch(handleAddVote(vote))  // will dispatch the toggle for answered
  }

  handleOptionChange = (e) => {
    this.setState({selectedOption: e.target.value})
  }

  render () {
    
	const { unknownId, question, answered, results, dispatch } = this.props
	if ( unknownId !== null ) {
      dispatch(setUnknownId(unknownId))
      return <Redirect to="/signin" />
    }
      
	const { name, avatar, optionOne, optionTwo } = question
    const { nVotes, nVotesOne, nVotesTwo, nVotesOnePc, nVotesTwoPc, yourVote } = results
    const yourVoteP = <p className="yourVote"> Your vote : {yourVote} </p> 
	
	const contentBeforeVote = 			
			<form
				className="vote"
				onSubmit={this.handleSubmit}>
				<span className="option">
					<input 
						type="radio" 
						checked={this.state.selectedOption === 'optionOne'}
						value='optionOne'
						onChange={this.handleOptionChange} />
					{`     ${optionOne }`} 
				</span>
				<span className="option">
					<input 
						type="radio" 
						checked={this.state.selectedOption === 'optionTwo'}
						value='optionTwo'
						onChange={this.handleOptionChange} />
					{`     ${optionTwo }`} 
				</span>
				<button className='btn' type='submit'>
            		Submit
            	</button>
      		</form>

	const contentAfterVote = 				
				<div className='results-info'>
					<h2> Results </h2>
					<div className="result">
						<p>Would you rather</p>
						<p> {optionOne} </p>
						<meter value={nVotesOnePc}  max="100"></meter>
						{`${nVotesOne} of ${nVotes} votes`}
					</div>
					<div className="result">
						<p>Would you rather</p>
						<p> {optionTwo} </p>
						<meter value={nVotesTwoPc}  max="100"></meter>
						{`${nVotesTwo} of ${nVotes} votes`}
					</div>
					{ yourVoteP }
				</div>
				

    const content = answered ? contentAfterVote : contentBeforeVote
	const title = answered ? `asked by ${name} :` : `${name} asks :`
	const header = answered ? null : <p className="rather">Would You Rather:</p>

    return (
    	<div className='question'>
			<p className='question-author'> {title} </p>	
			<div className='question-body'>
				<div className="avatar">
      				<img src={avatar} alt={`avatar of ${name}`}/>
				</div>
				<div className='question-info'>
					{ header }
					{ content }
				</div>
			</div>
      	</div>)
	}
}

function mapStateToProps({questions, votes, users, authedUser, answered}, {location}) {
	let qid = null
	let question = null
	let unknownId = null
	let vote = null
	let nVotes = null
	let nVotesOne = null
	let nVotesTwo = null
	let nVotesOnePc = null
	let nVotesTwoPc = null
	let yourVote = null

	if (typeof location.state === 'undefined') {
		unknownId = (location.pathname.split('/'))[2]
	} else {
		qid = location.state.qid
		question = questions[qid]
		if (!answered) {
			const user = authedUser
			const id = Object.keys(votes).length + 1
			vote =  {id, user, question: qid}
 		} else {
  			const relevantVotes = 
        		Object.values(votes)
					.filter((vote) => vote.question === qid)			
  			nVotes = relevantVotes.length
  			nVotesOne = (relevantVotes.filter((vote) => vote['vote'] === 'optionOne')).length
  			nVotesTwo = nVotes - nVotesOne
			nVotesOnePc = Math.round((nVotesOne / nVotes) * 100)
			nVotesTwoPc = Math.round((nVotesTwo / nVotes) * 100)
  			const yourVotes = relevantVotes.filter((vote) => vote['user'] === authedUser)
			yourVote = yourVotes[0]['vote'] 
		}
	}
	return {
		unknownId,
		question : question === null ? null : formatQuestion(question, users[question.author]),
		answered,
		vote,
		results : { nVotes, nVotesOne, nVotesTwo, nVotesOnePc, nVotesTwoPc, yourVote }
	}
}

export default connect(mapStateToProps)(Question)