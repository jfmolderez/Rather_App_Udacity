import React, { Component } from 'react'
import { connect } from 'react-redux'

class Score extends Component {
  
  render () {
    const { name, avatar, nvotes, nquestions, nscore } = this.props
    return (
      <div className='score'>
		<div className='avatar'>
        	<img src={avatar} alt={`avatar of ${name}`}/>
		</div>
		<div className='score-info'>
			<p>{name}</p>
		    <p> Answered questions : {nvotes} </p>
			<p> Created questions : {nquestions} </p>
		</div>
		<div className="score-total">
			<div className="score-title"> Score </div>
			<div className="score-nb"> {nscore} </div>
		</div>
      </div>
  	)
  }
}

function mapStateToProps({ users }, {userId, score }) {
	
  const user = users[userId]  
  return {
    name: user.name,
	avatar: user.avatarURL,
	nvotes: score[0],
	nquestions: score[1],
	nscore: score[2]
  }
}

export default connect(mapStateToProps)(Score)