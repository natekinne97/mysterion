import React from 'react';
import ITEMS from '../../ShoppingItems';
import {Link} from 'react-router-dom';

import './ShoppingPage.css';
// shoppingPage component
// renders all of the items able to be purchased.
// this page will display a picture and a price of all items
// then an item can be clicked and you can see the info for items
class ShoppingPage extends React.Component{

    state = {
        items: []
    }

    // get all items
    getAllItems(){
        console.log(ITEMS, 'all items');
        // returns state collected items
        this.setState({
            items: ITEMS
        });
    }

    // get all things on load
    componentDidMount(){
        this.getAllItems();
    }
    // check if we can map the items
    // display the items
    renderItems(){
        if(this.state.items.length > 0){
            console.log('items found');
            return this.state.items.map(item=>(
                <Link to={`/shop/${item.id}`} key={item.id} className="shopping-item">
                   
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
            ));
        }
        return (<p className="red">Something went wrong!</p>);
    }


    render(){
        return (
            <div className="shopping-page">
                <div className="shopping-container">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

export default ShoppingPage;