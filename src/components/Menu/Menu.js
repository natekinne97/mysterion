import React from 'react';
import {Link} from 'react-router-dom';

import itemContext from '../../context/itemContext';
import './Menu.css';

class Menu extends React.Component{
    static contextType = itemContext;
    state={
        show: 'hide',
        visible: false
    }

    mobileShow = ()=>{
        
        
        if(this.state.show === 'hide'){
            this.setState({
                show: '',
                visible: true
            })
        }else{
            this.setState({
                show: 'hide',
                visible: false
            })
        }
    }

    // renders desktop components
    renderMenuComponents(){
        return(
            <div className="desktop-menu-container">
                <header>Mysterion</header>
                <ul className="desktop-menu-items">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/work" onClick={this.mobileShow}>Work</Link></li>
                    <li><Link to="/about" onClick={this.mobileShow}>About</Link></li>
                    <li><Link to="/contact" onClick={this.mobileShow}>Contact</Link></li>
                    <li><Link to="/shop" onClick={this.mobileShow}>Shop</Link></li>
                    <li> <a href="tel:1-800-MYSTERION">1-800-MYSTERION</a></li>
                    <li>
                        <Link to="/cart"> Cart(
                                <span>{this.context.numberOfItems}</span>
                            )
                     </Link>
                    </li>
                </ul>
                <div className="cart-corner">
                   
                   
                </div>
            </div>
        );
    }

    mobileMenu(){
        const visible = this.state.visible;
        return(
            <div className="mobile">
                <div
                    className={`menu-item-container ${visible ? 'slide-in' : 'slide-out'}`}>
                    <ul className={`mobile-menu-items
                     ${this.state.show} `}>
                        <li><Link to="/" onClick={this.mobileShow}>Home</Link></li>
                        <li><Link to="/work" onClick={this.mobileShow}>Work</Link></li>
                        <li><Link to="/about" onClick={this.mobileShow}>About</Link></li>
                        <li><Link to="/contact" onClick={this.mobileShow}>Contact</Link></li>
                        <li><Link to="/shop" onClick={this.mobileShow}>Shop</Link></li>
                        <li>
                            <Link to="/cart" onClick={this.mobileShow}>Cart(
                                <span>{this.context.numberOfItems}</span>
                            )
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='menu-btn-container' onClick={this.mobileShow}>
                    <button >MENU</button>
                    <div className="bar"></div>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div className="menu">
                {this.mobileMenu()}
                {this.renderMenuComponents()}
               {/* {this.renderMenuComponents()} */}
            </div>
        );
    }
}

export default Menu;