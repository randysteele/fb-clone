import './styles/App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SidebarRow from './components/SidebarRow'

import Feed from './components/Feed'
import Login from './screens/Login'
import User from './screens/User'
// import Home from './screens/Home'
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { auth } from './firebase'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const addStructure = (Component, props) => {
    return (
      <>
        <Header />
        <main className="app__body">
          <Sidebar />
          <Component {...props} />
        </main>
      </>
    )
  }

  const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          addStructure(Component, props)
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      setIsLoggedIn(true)
    } else {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsLoggedIn(true)
        }
      })
    }
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="app">
      <Router>
        <Switch>
          {/* <GuardedRoute
            path="/channels/:id"
            auth={isLoggedIn}
            component={Channel}
          />
 */}
          <GuardedRoute path="/users/:id" auth={isLoggedIn} component={User} />

          {/* <GuardedRoute path="/add/channel" auth={isLoggedIn} component={Add} /> */}

          <Route path="/login">
            <Login />
          </Route>

          <GuardedRoute path="/" auth={isLoggedIn} component={Feed} />
          <GuardedRoute path="/" auth={isLoggedIn} component={Sidebar} />
          <GuardedRoute path="/" auth={isLoggedIn} component={SidebarRow} />

        </Switch>
      </Router>
    </div>
  )
}

export default App