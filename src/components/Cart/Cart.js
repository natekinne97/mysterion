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

    calculateTotal(){
        let total = 0
        if(this.context.items?.length){
            this.context.items.map(item=>{
                total += item.price
            })
        }
        return total
    }

    render(){
        return(
            <div className="cart-page">
                <div className="item-container">
                    <div className="cart-items">
                        {this.context.items && this.context.items?.map(item=>(
                        <div className="cart-item">
                            <p>{item.font}</p>
                            <button onClick={()=>this.removeItemFromCart(item)}>
                                Remove
                            </button>
                            <p>${item?.price}</p>
                        </div>
                    ))}
                    <div className="total-box">
                        <div>
                                <p>Total:  ${this.calculateTotal()}</p>
                        </div>
                    </div>
                    <div className="proceed-section">
                        <Link to='/'>Return to Shop</Link>
                        <Link to='/'>
                            Proceed to checkout
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;