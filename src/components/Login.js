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
            <div className="card card-signin my-5">
                <div className="card-body">
                    <h5 className="card-title text-center">Hungree Task</h5>
                    <form>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <span className="fa fa-user"></span>
                                    </span>                    
                                </div>
                                <input
                                type="text"
                                name="email"
                                onChange={this.handleChange}
                                placeholder="Email"
                                className="form-control"
                                required/>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <span className="fa fa-lock"></span>
                                    </span>                    
                                </div>
                                <input
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                placeholder="Password"
                                className="form-control"
                                required/>
                            </div>
                        </div>

                        <div class="form-group">
                            <button onClick={this.signInHandle} class="btn btn-primary login-btn btn-block">Sign In</button>
                            <button onClick={this.signUpHandle} class="btn btn-secondary login-btn btn-block">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;