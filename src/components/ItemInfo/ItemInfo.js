import React from 'react';
import ITEMS from '../../ShoppingItems'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// edit
import EditProduct from '../../adminComponents/EditProduct/EditProduct';

import itemContext from '../../context/itemContext';
import './ItemInfo.css';
// this component renders the info gotten from the server.
// we first get the parameter id
// then we send our request with the id
// and display the info
class ItemInfo extends React.Component{
    // this is for adding items to the cart. 
    // the cart component will use this to store all the items in the cart
    static contextType = itemContext;
    // get the id
    // get the params
    static defaultProps = {
        match: { params: {} },
        edit: ''
    }

    state = {
        item: [],
        edit: false
    }

    // find what we need based on params
    getItemsInfo(){
        let id = this.props.match.params.id;
       
        let item = ITEMS.find(i=>{
            return i.id === Number(id);
        });
       
        this.setState({
            item
        })
    }

    // adds items to the cart using context to globally access the data
    // at some point this will be able to access cookies with the cart data in them
    // storing only the ids and for a couple of days. 
    // it will look up the items on page load for that user.
    addToCart = ()=>{
        this.context.addItems(this.state.item);
      
        this.context.getNumberOfItems();
    }

    // get the info on load
    componentDidMount(){
        this.getItemsInfo();
    }

    // display edit form
    displayEditForm = ()=>{
        if(this.state.edit && this.props.edit){
            this.setState({
                edit: false
            })
        }else if(this.props.edit){
            this.setState({
                edit: true
            })
        }
    }

    // submit edit form for items
    itemEditFormSubmit = e =>{
        e.preventDefault();
        // get data from form
        const {image, title, description, price} = e.target
        // update data from state
        const updatedItem = {
            img: image.value,
            title: title.value,
            description: description.value,
            price: price.value
        }
        
        // update state
        this.setState({
            item: updatedItem,
            // hide form
            edit: false
        })
        
    }


    // display the options
    renderOptions = () => {
        if (this.props.edit) {
            // edit will only happen on the info page
            return (
                <div className="edit-btn">
                   <FontAwesomeIcon icon={faPencilAlt} onClick={this.displayEditForm} />
                </div>
            );
        } else {
            return null;
        }
    }

    renderItemInfo(){
        if(this.state.item){
            
            return(
                <div className="info-container">
                   
                    <div className="info-img" style={{
                        backgroundImage: `url(${this.state.item.img})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}></div>
                    <div className="info-group" >
                        {this.props.edit ?
                            this.renderOptions()
                            : null}
                        <h3>{this.state.item.title}</h3>
                        <p>{this.state.item.description}</p>
                        <p>${this.state.item.price}</p>
                        <Link onClick={this.addToCart} to="/cart">
                            Add to Cart
                        </Link>
                    </div>
                </div>
            )
        }
    }

    render(){
        
        return(
            <div className="item-info">
                {/* if in edit mode and the user is logged in
                then display the edit form */}
                {this.state.edit ?
                <EditProduct  item={this.state.item} handleFormSubmit={this.itemEditFormSubmit}/>
                : null}
                {this.renderItemInfo()}
            </div>
        )
    }
}

export default ItemInfo;