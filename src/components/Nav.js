import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  
  toHome = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
    this.props.history.push('/')
  }
  
  render() {
    const { signIn, name, avatar } =  this.props
    const navbarEnd =  signIn 
    					? null
      					: (
                        <Fragment>
                        <li className="hello">
      						<span> Hello {name} </span>
  							<img src={avatar} alt={`avatar for ${name}`}/>
      					</li>
      					<li>
      						<button id="logout" onClick={(e) => this.toHome(e)}>
      							Logout
      						</button>
      					</li> 
						</Fragment>)

    return (
    	<nav className='nav'>
      		<ul>
      			<li>
      				<NavLink to='/' exact activeClassName='active'>
      					Home
      				</NavLink>
      			</li>
				<li>
      				<NavLink to='/add' activeClassName='active'>
      					New Question
      				</NavLink>
      			</li>
      			<li>
      				<NavLink to='/leaderboard' exact activeClassName='active'>
      					Leader Board
      				</NavLink>
      			</li>
      			{ navbarEnd }
  			</ul>
  		</nav>)
	}
}

function mapStateToProps({users, authedUser}) {
	const signIn = authedUser === null
	const name = signIn ? null : users[authedUser].name
	const avatar = signIn ? null : users[authedUser].avatarURL
	return ({ signIn, name, avatar } )
}


export default withRouter(connect(mapStateToProps)(Nav))