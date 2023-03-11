import logo from './logo.svg';
import './App.css';
import { Button } from 'bootstrap';
import Signup from './components/Signup';
import Login from './components/Login';
import ComposeEmail from './components/ComposeEmail';
import { Redirect, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import { useSelector } from 'react-redux';
// import Inbox from './components/inbox';
import Inbox from './components/Inbox';
import Sent from './components/Sent';


function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
     <Header/>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/composeEmail">
          {isAuthenticated && <ComposeEmail/>}
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>

        <Route path="/inbox">
          {isAuthenticated && <Inbox/>}
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>


        <Route path="/sent">
          {isAuthenticated && <Sent/>}
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>

      </Switch>
    </div>
  );
}

export default App;
