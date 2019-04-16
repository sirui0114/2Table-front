import React  from 'react';
import logo from '../asset/images/logo.svg';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { Home } from './Home'
export class Header extends React.Component {
 static propTypes = {
   isLoggedIn: PropTypes.bool.isRequired,
   handleLogout: PropTypes.func.isRequired,
 }

 render() {
   return (
     <header className="App-header">
       <img src={logo} className="App-logo" alt="logo" />
       <h1 className="App-title">2Table<a className="Home-title" href="/home">   Home Page</a></h1>
       {
         this.props.isLoggedIn ?
         <div>
           <a className="logout"
              onClick={this.props.handleLogout}
           >
             <Icon type="logout" />{' '}Logout
           </a>
           <a className="logout"
              href = "/show_res">
              <Icon type="ordered-list" />{' '}reservation list
           </a>
         </div>
           :
           <a className="logout"
            href="/login"
           >
            <Icon type="login" />{' '}Login
            </a>
       }
     </header>
   );
 }
}

