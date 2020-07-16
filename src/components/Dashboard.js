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
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Categories</h3>
                            <h5 className="card-link">{this.state.totalCategories}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Products</h3>
                            <h5 className="card-link">{this.state.totalProducts}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Dashboard;