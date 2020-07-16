import React, { Component } from 'react';
import { FirebaseDB } from '../firebase';

class Categories extends Component {

    constructor(props){
        super(props);
        this.state = {
            categories: [],

            categoryName: "",
            actionSubmit: "Save",

            selectedId: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
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

    submitHandle = async (e) => {
        e.preventDefault();

        const postedCategory = { categoryName: this.state.categoryName}

        if(this.state.actionSubmit === 'Save'){
            const newCategory = (await FirebaseDB.ref('categories').push({ ...postedCategory })).key
            if (newCategory !== ""){
                this.setState({categories: [...this.state.categories, {id: newCategory, ...postedCategory}], categoryName: ""});
            }
        }else{
            FirebaseDB.ref('categories/' + this.state.selectedId).set({...postedCategory})
            .then(() => {
                this.setState({categories: this.state.categories.map(category => {
                    if(category.id === this.state.selectedId){
                        category.categoryName = postedCategory.categoryName
                    }
                    return category;
                }), selectedId: "", actionSubmit: "Save", categoryName: ""});
            })
            .catch(err => console.log(err))
        }
    }

    actionStatus = (categoryId) => {
        if(categoryId !== ""){
            FirebaseDB.ref('categories/' + categoryId).once('value')
            .then(snapshot => {
                this.setState({categoryName: snapshot.val().categoryName, selectedId: categoryId, actionSubmit: "Update"})
            })
            .catch(err => console.log(err));
        }else{
            this.setState({selectedId: "", actionSubmit: "Save", categoryName: ""});
        }
    }

    deleteCategory = (categoryId) => {
        if (window.confirm("Are you sure want to delete this data?")) {
            FirebaseDB.ref('categories/' + categoryId).remove()
            .then(() => {
                this.setState({categories: [...this.state.categories.filter(
                    category => category.id !== categoryId
                )]})
            })
            .catch(err => console.log(err));
        }
    }

    render(){
        return(
            <div>
                <h1>Categories</h1>
                <form onSubmit={this.submitHandle}>
                    <input
                    type="text"
                    onChange={this.handleChange}
                    name="categoryName"
                    value={this.state.categoryName}
                    placeholder="Category Name"
                    required
                    />
                    
                    <button type="submit">{this.state.actionSubmit}</button>
                    <button type="button" onClick={this.actionStatus.bind(this, "")}>Cancel</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <td>No.</td>
                            <td>Category</td>
                            <td>#</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map((row, index) => (
                            <tr key={row.id}>
                                <td>{index+1}</td>
                                <td>{row.categoryName}</td>
                                <td>
                                    <button
                                    onClick={this.actionStatus.bind(this, row.id)}>
                                        Edit
                                    </button>
                                    <button
                                    onClick={this.deleteCategory.bind(this, row.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Categories;