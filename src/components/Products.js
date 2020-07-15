import React, { Component } from 'react';
import { FirebaseDB } from '../config/firebase';

class Products extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            products: [],
            category: {},

            categoryId: "",
            productName: "",
            qty: "",
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
        
        FirebaseDB.ref('products').once('value')
        .then(snapshot => {
            snapshot.forEach(item => {
                FirebaseDB.ref('categories/' + item.val().categoryId)
                this.setState({products: [...this.state.products, {id: item.key, ...item.val()}]})
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

        await FirebaseDB.ref('categories/' + this.state.categoryId).once('value')
        .then(snapshot => {
            this.setState({category: {id: snapshot.key, ...snapshot.val()}})
        })
        .catch(err => console.log(err));

        const postedProduct = { 
            category: this.state.category,
            productName: this.state.productName,
            qty: this.state.qty
        }

        console.log(postedProduct);

        if(this.state.actionSubmit === 'Save'){
            const newProduct = (await FirebaseDB.ref('products').push({ ...postedProduct })).key
            if (newProduct !== ""){
                this.setState({products: [...this.state.products, {id: newProduct, ...postedProduct}]});
                this.resetForm();
            }
        }else{
            FirebaseDB.ref('products/' + this.state.selectedId).set({...postedProduct})
            .then(() => {
                this.setState({products: this.state.products.map(product => {
                    if(product.id === this.state.selectedId){
                        product.category = postedProduct.category
                        product.productName = postedProduct.productName
                        product.qty = postedProduct.qty
                    }
                    return product;
                })});
                this.resetForm();
            })
            .catch(err => console.log(err))
        }
    }

    actionStatus = (productId) => {
        if(productId !== ""){
            FirebaseDB.ref('products/' + productId).once('value')
            .then(snapshot => {
                this.setState({
                    categoryId: snapshot.val().category.id,
                    productName: snapshot.val().productName,
                    qty: snapshot.val().qty,
                    selectedId: productId,
                    actionSubmit: "Update"
                })
            })
            .catch(err => console.log(err));
        }else{
            this.resetForm();
        }
    }

    deleteProduct = (productId) => {
        if (window.confirm("Are you sure want to delete this data?")) {
            FirebaseDB.ref('products/' + productId).remove()
            .then(() => {
                this.setState({products: [...this.state.products.filter(
                    product => product.id !== productId
                )]})
            })
            .catch(err => console.log(err));
        }
    }

    resetForm = () => {
        this.setState({
            productName: "",
            categoryId: "",
            qty: "",
            selectedId: "",
            actionSubmit: "Save"
        });
    }

    render(){
        return(
            <div>
                <h1>Products</h1>
                <form onSubmit={this.submitHandle}>
                    <select
                        name="categoryId"
                        onChange={this.handleChange}
                        value={this.state.categoryId}
                        required
                    >
                        <option>-- Category --</option>
                        {this.state.categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                        ))}
                    </select>

                    <input
                    type="text"
                    onChange={this.handleChange}
                    name="productName"
                    value={this.state.productName}
                    placeholder="Product Name"
                    required
                    />
                    
                    <input
                    type="text"
                    onChange={this.handleChange}
                    name="qty"
                    value={this.state.qty}
                    placeholder="Qty"
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
                            <td>Product Name</td>
                            <td>Qty</td>
                            <td>#</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index+1}</td>
                                <td>{product.category.categoryName}</td>
                                <td>{product.productName}</td>
                                <td>{product.qty}</td>
                                <td>
                                    <button
                                    onClick={this.actionStatus.bind(this, product.id)}>
                                        Edit
                                    </button>
                                    <button
                                    onClick={this.deleteProduct.bind(this, product.id)}>
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

export default Products;