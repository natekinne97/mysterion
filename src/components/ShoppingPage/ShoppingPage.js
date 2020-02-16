import React from 'react';
import ITEMS from '../../ShoppingItems';
import {Link} from 'react-router-dom';



import './ShoppingPage.css';

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
    // componentDidMount(){
    //     this.getAllItems();
    // }





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


    renderConstructionSign(){
        return (
          <div className="fake-stuff">
            <div className="dept">
              <p>Fonts</p>
              <p>Mockups</p>
              <p>Apparel</p>
            </div>
            <div className="fake-item-container">
              {this.renderFakeImages()}
              <div className="orange-div">
                <h1>Coming this winter</h1>
                <form>
                    <input type='email' placeholder="Subscribe to our news letter" required/>
                    <button className='red-btn'>Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        );
    }

    // Here we are rendering a blank page that displays the construction sign
    renderFakeImages(){
        const img = [
          "https://i.imgur.com/VloosOE.jpg",
          "https://i.imgur.com/VloosOE.jpg",
          "https://i.imgur.com/VloosOE.jpg",
          "https://i.imgur.com/VloosOE.jpg",
          "https://i.imgur.com/VloosOE.jpg",
          "https://i.imgur.com/VloosOE.jpg"
        ];

        return img.map((item, index) => (
          <div key={index ** 4} className="fake-item shopping-item">
            <div
              className="item-img"
              style={{
                backgroundImage: `url(${item})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 60%"
              }}
            ></div>
            <p>T-Shirt</p>
            <p>$15</p>
          </div>
        ));

    }


    render(){
        return (
            <div className="shopping-page">
                <div className={`shopping-container ${this.props.edit ? 'edit' : ''}`}>
                    
                    {this.renderConstructionSign()}
                    {/* displays title on page */}
                   
                    {/* 
                    renders the add item form. placing it at the 
                    top so it can be easily readable 
                    */}
                   
                    

                     {/* displays content depending on if being edited */}
                    {/* {this.props.edit ? 
                    this.renderItemsForEdit() 
                    : this.renderItems()} */}


                </div>
            </div>
        );
    }
}

export default ShoppingPage;