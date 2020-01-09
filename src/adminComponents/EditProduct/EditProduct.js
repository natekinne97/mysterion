import React from 'react';

import '../EditWork/EditWork.css';
// this class displays the form for adding a new product
class AddProduct extends React.Component {
    static defaultProps = {
        handleFormSubmit: () => { },
        item: []
    }

    render() {
        const item = this.props.item;
        return (
            <div className="work-edit-container" >
                <form className="work-edit-form" onSubmit={this.props.handleFormSubmit}>
                    <label htmlFor="image">Image: </label>
                    <input name="image" type="text" placeholder={item.img} required />

                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" placeholder={item.title} required />

                    <label htmlFor="description">Description</label>
                    <input name="description" type="text" placeholder={item.description} required />

                    <label htmlFor="price">Price</label>
                    <input name="price" type="number" step="0.01" placeholder={item.price} required />

                    <button type="submit">Confirm Edit</button>
                </form>
            </div>
        );
    }
}

export default AddProduct;