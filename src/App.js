import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import Categories from './components/Categories';
import Products from './components/Products';
import { FirebaseApp } from './firebase';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }

    this.logoutHandle = this.logoutHandle.bind(this);
  }

  authListener = () => {
    FirebaseApp.auth().onAuthStateChanged((user)=>{
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
    FirebaseApp.auth().signOut();
  }
  
  render(){
    return (
      <div className="container">
        <div className="row">
            {
              this.state.user 
              ? <HashRouter>
                  <div className="col-sm-9 col-md-7 col-lg-6 mx-auto my-5">
                    <h1 className="lead text-center">Product Management System</h1>
                    
                    <nav className="navbar navbar-light bg-light">
                        <ul className="nav">
                          <li className="nav-item"><NavLink className="nav-link" to="/">Dashboard</NavLink></li>
                          <li className="nav-item"><NavLink className="nav-link" to="/categories">Categories</NavLink></li>
                          <li className="nav-item"><NavLink className="nav-link" to="/products">Products</NavLink></li>
                        </ul>
                        <form className="form-inline">
                          <button className="btn btn-mini btn-success" onClick={this.logoutHandle}>Logout</button>
                        </form>
                    </nav>
                    
                    <div className="content">
                      <Route exact path="/" component={Dashboard}/>
                      <Route exact path="/categories" component={Categories}/>
                      <Route exact path="/products" component={Products}/>
                    </div>
                  </div>
                </HashRouter>
              : 
              <div className="col-sm-9 col-md-7 col-lg-4 mx-auto">
                <Login/>
              </div>
            }
        </div>
      </div>
    );
  }
}

export default App;
