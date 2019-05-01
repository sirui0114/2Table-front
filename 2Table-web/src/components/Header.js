import React  from 'react';
import logo from '../asset/images/logo.svg';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { Home } from './Home'
import tablelogo from '../asset/table.png'

import '../styles/Header.css';

const style = {
  fontSize: '1.05rem',
  marginTop: '1rem',
};

export class Header extends React.Component {
 static propTypes = {
   isLoggedIn: PropTypes.bool.isRequired,
   handleLogout: PropTypes.func.isRequired,
 }


 render() {
   return (
     <header className="App-header">
       <img src={tablelogo} className="header-logo" alt="logo" />
       <img src={tablelogo} className="header-logo2" alt="logo" />
       {/* <h1 className="App-title"><a className="Home-title" href="/home">2Table</a></h1> */}


       <a href="/home"><h1 className="header-title">2TABLE</h1></a>
       {
         this.props.isLoggedIn ?
         <div>
           <a className="logout"
              onClick={this.props.handleLogout}
              style={style} 
           >
             <Icon type="logout" />{' '}Logout
           </a>
           <a className="logout"
              href = "/show_res"
              style={style} >
              <Icon type="ordered-list" />{' '}reservation list
           </a>
         </div>
           :
           <a className="logout"
            href="/login"
            style={style} 
           >
            <Icon type="login" />{' '}Login
            </a>
       }
     </header>
   );
 }
}

