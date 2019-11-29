import React from 'react'

import {
  Link,
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom'

export default function App() {
  return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/signin'>Sign In</Link>
            </li>
            <li>
              <Link to='/signup'>Sign Up</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

function Signin() {
  return <h2>Signin</h2>
}

function Signup() {
  return <h2>Signup</h2>
}
