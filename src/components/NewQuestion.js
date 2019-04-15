import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  
  state = {
    optionOne : '',
    optionTwo : '',
    toHome : false
  }

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value
    this.setState(() => ({
      optionOne
    }))
  }

  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value
    this.setState(() => ({
      optionTwo
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props 
    
    dispatch(handleAddQuestion(optionOne, optionTwo))
     
    this.setState(() => ({
      optionOne : '',
      optionTwo : '',
      toHome : true
    }))
  }
  
  render () {
    const { authedUser } = this.props
    const { optionOne, optionTwo, toHome } = this.state

	if ( authedUser === null ) {
      return <Redirect to = '/signin' />
    }
	
	if ( toHome ) {
      return <Redirect to = '/' />
    }

    return (
      <div className="new">
      	<div className="new-header">
      		<h3 className='center'> Create New Question </h3>
      		<p> Complete the question : </p>
    		<h4> Would you rather ... </h4>
      	</div>
        <form className='new-question' onSubmit={this.handleSubmit}>
    		<input 
    			className='inputOption'
    			type="text" 
    			value={optionOne} 
				placeholder='option one' 
				onChange={this.handleChangeOptionOne}/>
			<br/>
    		<input
                className='inputOption'
            	type="text" 
                value={optionTwo} 
				placeholder='option two' 
				onChange={this.handleChangeOptionTwo}/>
			<button
				className='submit'
				type='submit'
				disabled={optionOne==='' || optionTwo===''}> 
				Submit
			</button>
    	</form>
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return { authedUser }
}
export default connect(mapStateToProps)(NewQuestion)