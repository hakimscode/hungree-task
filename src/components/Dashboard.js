import React, { Component } from 'react';
import { FirebaseDB } from '../firebase';

class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            totalCategories: 0,
            totalProducts: 0
        }
    }

    componentDidMount = () => {
        FirebaseDB.ref('categories').once("value")
        .then(snap => {
            snap.forEach(() => {
                this.setState({totalCategories: this.state.totalCategories + 1})
            })
        })
        .catch(err => console.log(err));
        
        FirebaseDB.ref('products').once("value")
        .then(snap => {
            snap.forEach(() => {
                this.setState({totalProducts: this.state.totalProducts + 1})
            })
        })
        .catch(err => console.log(err));
    }
    
    render(){
        return(
            <div>
                <h3>Categories: {this.state.totalCategories}</h3>
                <h3>Products: {this.state.totalProducts}</h3>
            </div>
        )
    }

}

export default Dashboard;