import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from './store';
import {loadUser} from "./actions/auth";
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import Navigationbar from "./components/layout/Navigationbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/user/Profile";
import HomePage from "./components/layout/HomePage";
import SearchUsers from "./components/search/SearchUsers";
import SearchMovies from "./components/search/SearchMovies";

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // const history = syncHistoryWithStore(useHistory, store);

  return (
    <Provider store={store}>
      <div className="background-image min-vh-100 text-light">
        <Router>
          <Navigationbar />
          {/*<Switch>*/}
            <Route exact path='/home' component={HomePage}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/profile/:id' component={(e) =>
                <Profile userId={e.match.params.id} tab="watchList"/>}
            />
            <Route exact path='/profile/:id/:tab' component={(e) =>
                <Profile userId={e.match.params.id} tab={e.match.params.tab}/>}
            />
            <Route exact path='/search/movie/:query'
                   component={(e) => <SearchMovies query={e.match.params.query}/>}
            />
            <Route exact path='/search/user/:userName'
                   component={(e) => <SearchUsers userName={e.match.params.userName}/>}
            />
          {/*</Switch>*/}
        </Router>
      </div>
    </Provider>
  );
}

export default App;
