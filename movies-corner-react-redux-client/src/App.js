import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from './store';
import {loadUser} from "./actions/auth";
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import Navigationbar from "./components/layout/Navigationbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="background-image min-vh-100 text-light">
        <Router>
          <Navigationbar />
          <Switch>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
