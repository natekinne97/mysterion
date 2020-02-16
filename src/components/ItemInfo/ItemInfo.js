import React from 'react';
import ITEMS from '../../ShoppingItems'
import { Link } from 'react-router-dom';

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
                {this.renderItemInfo()}
            </div>
        )
    }
}

export default ItemInfo;