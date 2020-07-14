import React, { Component } from 'react';
import firebaseApp from '../config/firebase';

var db = firebaseApp.firestore();

class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            totalCategories: 0,
            totalProducts: 0
        }

        this.logoutHandle = this.logoutHandle.bind(this);
    }

    componentDidMount = () => {
        db.collection('Categories').get()
        .then(snap => {this.setState({totalCategories: snap.size})})
        .catch(err => console.log(err));

        db.collection('Products').get()
        .then(snap => {this.setState({totalProducts: snap.size})})
        .catch(err => console.log(err));
    }

    logoutHandle = (e) => {
        e.preventDefault();
        firebaseApp.auth().signOut();
      }
    
    render(){
        return(
            <div>
                <h3>Categories: {this.state.totalCategories}</h3>
                <h3>Products: {this.state.totalProducts}</h3>
                <button onClick={this.logoutHandle}>Logout</button>
            </div>
        )
    }

}

export default Dashboard;