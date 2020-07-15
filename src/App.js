import React, { Component } from 'react';
import './App.css';
import firebaseApp from './config/firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import Categories from './components/Categories';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }

    this.logoutHandle = this.logoutHandle.bind(this);
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
          ? <HashRouter>
              <div>
                <h1>Product Management System</h1>
                <ul>
                  <li><NavLink to="/">Dashboard</NavLink></li>
                  <li><NavLink to="/categories">Categories</NavLink></li>
                  <li><NavLink to="/products">Products</NavLink></li>
                </ul>
                <button onClick={this.logoutHandle}>Logout</button>
                <div>
                  <Route exact path="/" component={Dashboard}/>
                  <Route exact path="/categories" component={Categories}/>
                </div>
              </div>
            </HashRouter>
          : <Login/>
        }
      </div>
    );
  }
}

export default App;
