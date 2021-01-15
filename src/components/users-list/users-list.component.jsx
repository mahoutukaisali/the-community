import React from 'react';
import { Link } from 'react-router-dom';
import { admin, auth, createUserProfileDocument } from '../firebase/firebase.utils';
// ReactComponent is a special syntax from React that render SVG
import './users-list.styles.scss';

class UsersList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          displayName: '',
          email: ''
      }
  }
  
  
  getLoggedInUsers = auth.onAuthStateChanged((user) => {
    // update the state value in here but this variable is not called directly
    if (user) {
      this.setState({
        displayName: user.displayName,
        email: user.email
      });
    }
  });

  render() {
    return(
    <div className='users-list'>
      <h2>{this.state.displayName}</h2>
      <h2>{this.state.email}</h2>
      <h2>logging in users</h2>
      listAllUsers();
    </div>
    )
  }
}

export default UsersList;