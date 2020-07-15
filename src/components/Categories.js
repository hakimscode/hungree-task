import React, { Component } from 'react';
import { FirebaseDB } from '../config/firebase';

class Categories extends Component {

    constructor(props){
        super(props);
        this.state = {
            categories: [],

            categoryName: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
    }

    componentDidMount = () => {
        FirebaseDB.ref('categories').once('value')
        .then(snapshot => {
            snapshot.forEach(item => {
                this.setState({categories: [...this.state.categories, {id: item.key, ...item.val()}]})
            })
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveCategory = async (e) => {
        e.preventDefault();

        const category = { categoryName: this.state.categoryName}

        const newCategory = (await FirebaseDB.ref('categories').push({ ...category })).key
        if (newCategory !== ""){
            this.setState({categories: [...this.state.categories, {id: newCategory, ...category}]})
        }
    }

    render(){
        return(
            <div>
                <h1>Categories</h1>
                <form>
                    <input
                    type="text"
                    onChange={this.handleChange}
                    name="categoryName"
                    required
                    />
                    
                    <button onClick={this.saveCategory}>Save</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <td>No.</td>
                            <td>Category</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map((row, index) => (
                            <tr key={row.id}>
                                <td>{index+1}</td>
                                <td>{row.categoryName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Categories;