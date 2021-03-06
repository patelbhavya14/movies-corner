import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import store from './store';
import {loadUser} from "./actions/auth";
import {setAuthToken} from './utils/setAuthToken';
import { Provider } from 'react-redux';
import Navigationbar from "./components/layout/Navigationbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/user/Profile";
import HomePage from "./components/layout/HomePage";
import SearchUsers from "./components/search/SearchUsers";
import SearchMovies from "./components/search/SearchMovies";
import Movie from "./components/movie/Movie";
import {syncHistoryWithStore} from "react-router-redux";
// import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import NotFound from "./components/layout/NotFound";
import IntroductionPage from "./components/layout/IntroductionPage";

if(localStorage.token) {
  setAuthToken();
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const history = syncHistoryWithStore(
      createBrowserHistory(),
      store
  );

  return (
    <Provider store={store}>
      <div className="background-image min-vh-100 text-light">
        <Router history={history}>
          <Navigationbar />
          <Switch>
            <Route exact path='/' component={IntroductionPage}/>
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
            <Route exact path='/movie/:movieId'
                   component={(e) => <Movie movieId={e.match.params.movieId} />}
            />
            <Route path='' component={NotFound}/>
            {/*<Redirect to='/404'/>*/}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
