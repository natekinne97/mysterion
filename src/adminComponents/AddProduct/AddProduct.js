import React from 'react';

import '../EditWork/EditWork.css';
// this class displays the form for adding a new product
class AddProduct extends React.Component{
    static defaultProps = {
        handleFormSubmit: ()=>{},
    }

    render(){
        return(
            <div className="work-edit-container" >
                <form className="work-edit-form" onSubmit={this.props.handleFormSubmit}>
                    <label htmlFor="image">Image: </label>
                    <input name="image" type="text" required/>

                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" required/>

                    <label htmlFor="description">Description</label>
                    <input name="description" type="text" required/>

                    <label htmlFor="price">Price</label>
                    <input name="price" type="number" step="0.01" required/>

                    <button type="submit">Add Item</button>
                </form>
            </div>
        );
    }
}

export default AddProduct;