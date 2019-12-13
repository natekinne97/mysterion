import React from 'react';
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import itemContext from '../../context/itemContext';
import './Menu.css';

class Menu extends React.Component{
    static contextType = itemContext;
    state={
        show: 'hide'
    }

    mobileShow = ()=>{
        if(this.state.show === 'hide'){
            this.setState({
                show: ''
            })
        }else{
            this.setState({
                show: 'hide'
            })
        }
    }

    renderMenuComponents(){
        return(
            <>
                <div className={`bottom-menu ${this.state.show}`}>
                    <Link to="/">Home</Link>
                    <ul>
                        <li><Link to="/work">Work</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                    <Link to="/shop">Shop</Link>
                </div>
            </>
        );
    }

    render(){
        return(
            <div className="menu">
                <div className="top-menu">
                    <header>Mysterion</header>
                    <Link to="/cart">Cart(<span>{this.context.numberOfItems}</span>)</Link>
                    <FontAwesomeIcon onClick={this.mobileShow} className="burger-menu" icon={faBars} />
                </div>
               {this.renderMenuComponents()}
            </div>
        );
    }
}

export default Menu;