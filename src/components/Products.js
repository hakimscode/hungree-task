import React, { Component } from 'react';
import firebaseApp from '../config/firebase';

var db = firebaseApp.firestore();

class Products extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    render(){
        return(
            <div>
                <h1>Products</h1>
            </div>
        );
    }

}

export default Products;