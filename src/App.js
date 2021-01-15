import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TopPage from './pages/toppage/toppage.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './components/firebase/firebase.utils';
import LobbyPage from './pages/lobby/lobby.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // currentUser will have user object or null
      currentUser: null
    }
  }
  
  // auth state will be changed as null to save computer memory when users sign out
  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
            }
          });
          console.log(this.state)
        });
      }
      this.setState({ currentUser: userAuth })
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={TopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
          <Route path='/lobby' component={LobbyPage} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
