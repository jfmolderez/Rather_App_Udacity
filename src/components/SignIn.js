import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import logo from '../logo.svg'

class SignIn extends Component {
  
  state = {
    userId : '',
    error : false
  }
  
  handleSubmit = (event) => {
        event.preventDefault()
        const { unknownId, dispatch } = this.props  
        if (unknownId !== null) {
        	this.setState({ error: true })
        } else {
       		dispatch(setAuthedUser(this.state.userId))
    		this.props.history.push('/')
        }
  }

  handleChange = (event) => {
 	this.setState({userId: event.target.value})
  }
  
  render () {
    
    if (this.state.error) {
      return <Redirect to="/error" />
    }
      
    const { userkvals } = this.props
    const { userId }   = this.state
    return (
    	<div className="signin">
      		<div className="signin-header">
 				<h2 className="signin-htitle"> Welcome to the Would You Rather App </h2>
      			<h3 className="signin-htext"> Please sign in to continue </h3>
      		</div>
      		<img src={logo} className="logo" alt="logo" />
      		<div>
      			<h2> Sign In </h2>   	
      			<form className="signin-form" onSubmit={this.handleSubmit}>					
					<select 
						className="signin-select"
						onChange={this.handleChange} 
						value={userId}>
						<option value="" disabled selected> Select user </option>
						{userkvals.map((kval) => (
                          	<option key={kval[0]} value={kval[0]}> {kval[1]} </option>
						))}
					</select>
					
				    <button 
                        className='submit'
                        type='submit'
                        disabled={userId === ''}>
                        Submit
                    </button>
      			</form>
      		</div>
    	</div>
      )
  }
}

function mapStateToProps ({ users, questions, unknownId }) {
  return {
    userkvals: Object.keys(users).map((k) => [k, users[k].name]),
    unknownId
  }
}

export default withRouter(connect(mapStateToProps)(SignIn))
