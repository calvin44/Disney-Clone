import React from 'react'
import './App.css'
import Header from './components/Header'
import Detail from './components/Detail'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Login from './components/Login'

function App () {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Detail/:id">
            <Detail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;