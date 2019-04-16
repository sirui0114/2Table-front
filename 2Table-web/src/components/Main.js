import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home';
import { Reserve } from './Reserve';
import {ShowReserve} from './ShowReserve'

export class Main extends React.Component {
getLogin = () => {
   return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>;
}

// 我没有后端和数据库，这里把你的改了，要改回来
getHome = () => {
    return  <Home userId = {this.props.userId}/>;
}

getReserve = ({match}) => {
  return this.props.isLoggedIn ?  <Reserve resId={match.params.resId} userId = {match.params.userId}/> : <Login handleLogin={this.props.handleLogin}/>;
}

getShowReserve = ({match}) => {
    return this.props.isLoggedIn ? <ShowReserve Id = {this.props.userId} client = {this.props.client}/> : <Login handleLogin={this.props.handleLogin}/>;
}

getRoot = () => {
    return <Redirect to="/login"/>;
}

 render() {
   return (
     <div className="main">
        <Switch>
            <Route exact path="/" render={this.getRoot}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" render={this.getLogin}/>
            <Route path="/home" render={this.getHome}/>
            <Route path="/reserve/:resId&:userId" component={this.getReserve} />
            <Route path="/show_res" component={this.getShowReserve} />
            <Route render={this.getRoot}/>
        </Switch>
     </div>
   );
 }
}
