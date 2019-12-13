import React from 'react';
import {Link} from 'react-router-dom';
import itemContext from '../../context/itemContext';
import './Cart.css';

// this is the cart class
// it displays all the items added to the cart.
class Cart extends React.Component{
    static contextType = itemContext;
    
    removeItemFromCart = (id)=>{
        this.context.removeItem(id);
    }

    renderItems(){
        if(this.context.numberOfItems > 0 ){
           
            let itemsDisplay = this.context.items.map(item=>(
                <div key={item.id} className="item">
                    <div className="tiny-pic" style={{
                        backgroundImage: `url(${item.img})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}></div>
                    <Link to={`/shop/${item.id}`}>{item.title}</Link>
                    <p className="remove" onClick={e => this.removeItemFromCart(item.id)}>Remove</p>
                    <p>${item.price}</p>
                </div>
            ));

            return itemsDisplay;
        }else{
            return (<p>
             Go find something you like first!
            </p>)
        }
    }

    renderTotal(){
        if (this.context.numberOfItems > 0 && this.context.items.length > 0){
            let prices = 0;

            for(let i = 0; i< this.context.numberOfItems; i++){
                if(this.context.items[i].price){
                    prices += this.context.items[i].price;
                }
            }
            return (
            <div className="total-box">
                <p>Total</p>
                <p>{prices}</p>
            </div>
            );
        }else{
            return (
                <div className="total-box">
                    <p>Total</p>
                    <p>0</p>
                </div>
            );
        }
    }

    render(){
        return(
            <div className="cart-page">
                <div className="item-container">
                    {this.renderItems()}
                    {this.renderTotal()}
                </div>
            </div>
        );
    }
}

export default Cart;