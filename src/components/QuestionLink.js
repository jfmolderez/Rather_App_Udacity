import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'


class QuestionLink extends Component {
   
  render () {
    
    const { question } = this.props
	const qid = question.id

    const { name, avatar, optionOne } = question
    
    return (
      <Link
      	to= {{
      		pathname: `question/${qid}`,
			state: {qid} }}
      		className='question'>

		<p className='question-author'> {name} asks : </p>	
		<div className='question-body'>
			<div className="avatar"> 
      			<img src={avatar} alt={`avatar of ${name}`}/>
			</div>
			<div className='question-info'>
				<p className="rather">Would You Rather:</p>
				<p className="question-text"> {optionOne} </p>
			</div>
		</div>
		
      </Link>
  	)
  }
}

function mapStateToProps({ questions, users }, { qid }) {
  const question = questions[qid]
  return {
    question : question 
				? formatQuestion(question, users[question.author])
				: null
  }
}

export default connect(mapStateToProps)(QuestionLink)