import React, { Component } from 'react';
import { FirebaseApp } from '../firebase';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.signInHandle = this.signInHandle.bind(this);
        this.signUpHandle = this.signUpHandle.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    signInHandle = (e) => {
        e.preventDefault();
        FirebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    signUpHandle = (e) => {
        e.preventDefault();
        FirebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    render(){
        return (
          <div className="row">
              <form>
                  <input
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Email"
                  required/>
                  
                  <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Password"
                  required/>

                  <button onClick={this.signInHandle}>Sign In</button>
                  <button onClick={this.signUpHandle}>Sign Up</button>
              </form>
          </div>
        );
    }
}

export default Login;