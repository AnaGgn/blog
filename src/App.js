import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import React from 'react';
import { useToken } from './components/authContext';

function App() {

  const {token} = useToken();

  return (

      <Router>
          <Switch>
              {
                token !== null ? (
                  <>
                      <Redirect to='/' component={Home}/>
                      <Route path='/'>
                        <Home />
                      </Route>
                  </>
                ) : token === null ? (
                  <>
                      <Redirect to='/login' component={Login} />
                      <Route path='/login'>
                        <Login />
                      </Route>
                  </>
                ) : (
                  <>
                      <Redirect to='/login' component={Login} />
                      <Route path='/login'>
                        <Login />
                      </Route>
                  </>
                )
              }
          </Switch>
      </Router> 
  );
}

export default App;


