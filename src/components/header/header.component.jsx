import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase.utils';
// ReactComponent is a special syntax from React that render SVG
import './header.styles.scss';

const Header = ({ currentUser }) => (
    <div className='header'>
      <Link className="top" to='/'>
        Top
      </Link>
    <div className="options">
      <Link className="option" to="/signin">
        Register
      </Link>
        {
          currentUser ?
          <div className='option' onClick={ () => auth.signOut()}>SIGN OUT</div>
          :
          <Link className="option" to="/signin">SIGN IN</Link>
        }
          </div>
    </div>
)

export default Header;