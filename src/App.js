import React, { Component } from 'react';
import './App.css';
import firebaseApp from './config/firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
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
  
  render(){
    return (
      <div className="App">
        {
          this.state.user 
          ? <Dashboard></Dashboard>
          : <Login/>
        }
      </div>
    );
  }
}

export default App;
