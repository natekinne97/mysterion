import React from 'react';
import ITEMS from '../../ShoppingItems';
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons';


import './ShoppingPage.css';
// import the editor
import AddProduct from '../../adminComponents/AddProduct/AddProduct';

// shoppingPage component
// renders all of the items able to be purchased.
// this page will display a picture and a price of all items
// then an item can be clicked and you can see the info for items
class ShoppingPage extends React.Component{

    // props for if the admin is using this page
    static defaultProps = {
        edit: ''
    }

    state = {
        items: [],
        addItem: false
    }

    // get all items
    getAllItems(){
       
        // returns state collected items
        this.setState({
            items: ITEMS
        });
    }

    // get all things on load
    componentDidMount(){
        this.getAllItems();
    }

    // display the options
    renderOptions = id => {
        if (this.props.edit) {
            // edit will only happen on the info page
            return (
                <div className="edit-btn">
                    {/* add button */}
                    <FontAwesomeIcon icon={faPlusSquare} onClick={this.displayAddItemForm} />
                    
                    {/* remove button */}
                    <FontAwesomeIcon icon={faTrash} onClick={e => this.removeItem(id)} />
                </div>
            );
        } else {
            return null;
        }
    }
    
    // allow removal
    // removes only on the main page
    removeItem = id =>{
        // get state data
        let data = this.state.items
        // remove the item
        let items = data.filter(item=> item.id !== Number(id));
       
        // set state data
        this.setState({
            items: items
        });
    }


    // display add
    // we are going to allow the the admins to only add the items on the main page
    // this is because we are not actually doing anything
    displayAddItemForm = ()=>{
        if(this.state.addItem && this.props.edit){
            this.setState({
                addItem: false
            })
        }else if(this.props.edit){
            this.setState({
                addItem: true
            })
        }
    }

    handleAddItemForm = e =>{
        e.preventDefault();
        // get the data from the form
        const {image, title, description, price} = e.target;
        // get the state data
        let data = this.state.items;
        const newItem = {
            img: image.value,
            title: title.value,
            description: description.value,
            price: price.value
        }

        data.push(newItem);
        this.setState({
            items: data,
            addItem: false
        });

    }



    // check if we can map the items
    // display the items
    renderItems(){
        if(this.state.items.length > 0){
           
            return this.state.items.map(item=>(
                <Link to={`/shop/${item.id}`} key={item.id} className={`shopping-item ${this.props.edit ? 'edit-items' : ''}`}>
                   
                    <div className="item-img" style={{
                        backgroundImage: `url(${item.img})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '50% 60%'
                    }}>
                    </div>
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    {this.renderOptions(item.id)}
                </Link>
            ));
        }
        return (<p className="red">Something went wrong!</p>);
    }

    // this renders the main content differently
    // it renders only when the user is in edit mode
    renderItemsForEdit(){
        if (this.state.items.length > 0 && this.props.edit) {
           
            return this.state.items.map(item => (
               <div key={item.id**8}>
                    <Link to={`/admin-stuff/items/${item.id}`} 
                    key={item.id} 
                    className={`shopping-item ${this.props.edit ? 'edit-items' : ''}`}>

                        <div className="item-img" style={{
                            backgroundImage: `url(${item.img})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '50% 60%'
                        }}>
                        </div>
                        <p>{item.title}</p>
                        <p>${item.price}</p>
                        
                    </Link>
                       
                    {this.renderOptions(item.id)}
               </div>
            ));
        }
        return (<p className="red">Something went wrong!</p>);
    }


    render(){
        return (
            <div className="shopping-page">
                <div className={`shopping-container ${this.props.edit ? 'edit' : ''}`}>
                    {/* displays title on page */}
                    {this.props.edit ? 
                    <h1>Edit and add product</h1>
                     : null}
    
                    {/* 
                    renders the add item form. placing it at the 
                    top so it can be easily readable 
                    */}
                    {this.state.addItem ?
                    <AddProduct handleFormSubmit={this.handleAddItemForm}/>
                    : null}
                    

                     {/* displays content depending on if being edited */}
                    {this.props.edit ? 
                    this.renderItemsForEdit() 
                    : this.renderItems()}


                </div>
            </div>
        );
    }
}

export default ShoppingPage;