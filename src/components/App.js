import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LoadingBar } from 'react-redux-loading'

import Nav from './Nav'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import Question from './Question'
import Error from './Error'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render () {
    const { loading } = this.props 
  
    return (
      <Router>
      <Fragment>
      	<LoadingBar />
      	<div className='container'>
      		<Nav />
      		{loading
      			? null
       			: <div>
      				<Route path='/' exact component={Dashboard} />
					<Route path='/signin' component={SignIn} />
					<Route path='/add' component={NewQuestion} />
					<Route path='/leaderboard' component={Leaderboard} />
					<Route path='/question/:id' component={Question} />
					<Route path='/error' component={Error} />
      			</div>
			}
	  	</div>
	</Fragment>
	</Router>	
	)
  }
}

function mapStateToProps({users, questions, votes, authedUser, poll}) {
  return {
    loading: questions === null || users === null || votes === null,
  }
}

export default connect(mapStateToProps)(App)