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
            <div className="row">
                <div className="col-lg-12">
                    <h2>Categories</h2>
                </div>
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.submitHandle}>
                                <div className="form-group">
                                    <label>Category Name</label>
                                    <input
                                    type="text"
                                    onChange={this.handleChange}
                                    name="categoryName"
                                    value={this.state.categoryName}
                                    placeholder="Category Name"
                                    className="form-control"
                                    required
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">{this.state.actionSubmit}</button>
                                    <button type="button" onClick={this.actionStatus.bind(this, "")} className="btn btn-secondary float-right">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Category</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categories.map((category, index) => (
                                <tr key={category.id}>
                                    <td>{index+1}</td>
                                    <td>{category.categoryName}</td>
                                    <td>
                                        <button
                                        onClick={this.deleteCategory.bind(this, category.id)}
                                        className="btn btn-danger btn-sm float-right m-1"
                                        >
                                            Delete
                                        </button>
                                        <button
                                        onClick={this.actionStatus.bind(this, category.id)}
                                        className="btn btn-warning btn-sm float-right m-1"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Categories;