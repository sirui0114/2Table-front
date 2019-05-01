import React  from 'react';
import { Header }  from './components/Header';
import { Main } from './components/Main';
import { TOKEN_KEY } from './constants';

import './styles/App.css';
import Helmet from 'react-helmet';


 class App extends React.Component {
   state = {
     isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
     userId: localStorage.getItem('userId'),
     client: localStorage.getItem('Client')
   }

   handleLogin = (response, Id, Client) => {
     localStorage.setItem(TOKEN_KEY, response);
     localStorage.setItem('userId', Id);
     localStorage.setItem('Client', Client);
     this.setState({ isLoggedIn: true, userId : Id, client: Client });
     console.log(this.state);
   }

   handleLogout = () => {
     localStorage.removeItem(TOKEN_KEY);
     this.setState({ isLoggedIn: false });
   }

   render() {
     return (
       <div className="App">
        <Helmet bodyAttributes={{style: 'background-color : white'}}/>
         <Header isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} handleLogout={this.handleLogout} userId={this.state.userId} client={this.state.client}/>
         <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} userId={this.state.userId} client={this.state.client}/>
       </div>
     );
   }
  }

  export default App;