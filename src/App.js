import React, { Component } from 'react';
import './App.css';
import firebaseApp from './config/firebase';
import Login from './components/Login';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }

    this.logoutHandle = this.logoutHandle.bind(this)
  }

  authListener = () => {
    firebaseApp.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user})
      }else{
        this.setState({user: null})
      }
    })
  }
  
  componentDidMount = () => {
    this.authListener();
  }

  logoutHandle = (e) => {
    e.preventDefault();
    firebaseApp.auth().signOut();
  }
  
  render(){
    return (
      <div className="App">
        {
          this.state.user 
          ? (
            <div>
              <h1>You are Logged In</h1>
              <button onClick={this.logoutHandle}>Logout</button>
            </div>
          )
          : <Login/>}
      </div>
    );
  }
}

export default App;
