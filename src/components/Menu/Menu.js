import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorageItems } from '../../services/addItemToLocalStorage'
import itemContext from '../../context/itemContext';
import './Menu.css';



const MobileMenu = ({ numberOfItems, visible, mobileShow }) => {

    return (
        <div className="mobile">
            <div
                className={`menu-item-container ${visible ? 'slide-in' : 'slide-out'}`}>
                <ul className={`mobile-menu-items
                 ${visible ? '' : 'hide'} `}>
                    <li><Link to="/" onClick={mobileShow}>Home</Link></li>
                    {/* <li><Link to="/work" onClick={mobileShow}>Work</Link></li> */}
                    <li><Link to="/about" onClick={mobileShow}>About</Link></li>
                    <li><Link to="/contact" onClick={mobileShow}>Contact</Link></li>
                    {/* <li><Link to="/shop" onClick={mobileShow}>Shop</Link></li> */}
                    <li>
                        <Link to="/cart" onClick={mobileShow}>Cart(
                            <span>{numberOfItems}</span>
                        )
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='menu-btn-container w-full' onClick={mobileShow}>
                <button >MENU</button>
            </div>
        </div>
    )
}

const DesktopMenu = ({ numberOfItems, visible, mobileShow }) => {

    return (
        <div className="desktop-menu-container">
            <header><Link to="/">Mysterion</Link></header>
            <ul className="desktop-menu-items">
                {/* <li><Link to="/">Home</Link></li>
                <li><Link to="/work" onClick={this.mobileShow}>Work</Link></li> */}
                <li><Link to="/about" onClick={mobileShow}>About</Link></li>
                <li><Link to="/contact" onClick={mobileShow}>Contact</Link></li>
                {/* <li><Link to="/shop" onClick={mobileShow}>Shop</Link></li> */}
                {/* <li> <a href="tel:1-800-MYSTERION">1-800-MYSTERION</a></li> */}
                <li>
                    <Link to="/cart"> Cart(
                            <span>{numberOfItems}</span>
                        )
                 </Link>
                </li>
            </ul>
            <div className="cart-corner">
            </div>
        </div>
    );
}

const Menu = () => {
    console.log('menu')
    const { numberOfItems } = useContext(itemContext)
    const [ visible, setVisible ] = useState(false)
    const [ itemsLength, setNumberOfItems ] = useState(0)


    useEffect(() => {
        const localCartItems = getLocalStorageItems()

        setNumberOfItems(numberOfItems?.length || localCartItems?.length)
    }, [ setNumberOfItems, numberOfItems ])

    const mobileShow = () => {
        if (!visible) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    return (
        <div className="menu">
            <MobileMenu numberOfItems={itemsLength} visible={visible} mobileShow={mobileShow} />
            <DesktopMenu numberOfItems={itemsLength} visible={visible} mobileShow={mobileShow} />
        </div>
    )
}

// class Menu extends React.Component {
//     static contextType = itemContext;
//     state = {
//         show: 'hide',
//         visible: false,
//         numberOfItems
//     }




//     getNumberOfCartItems () {
//         const localCartItems = getLocalStorageItems()

//         return this.context.numberOfItems?.length || localCartItems?.length
//     }

//     // renders desktop components
//     renderMenuComponents () {
//         return (
//             <div className="desktop-menu-container">
//                 <header><Link to="/">Mysterion</Link></header>
//                 <ul className="desktop-menu-items">
//                     {/* <li><Link to="/">Home</Link></li>
//                     <li><Link to="/work" onClick={this.mobileShow}>Work</Link></li> */}
//                     <li><Link to="/about" onClick={this.mobileShow}>About</Link></li>
//                     <li><Link to="/contact" onClick={this.mobileShow}>Contact</Link></li>
//                     <li><Link to="/shop" onClick={this.mobileShow}>Shop</Link></li>
//                     {/* <li> <a href="tel:1-800-MYSTERION">1-800-MYSTERION</a></li> */}
//                     <li>
//                         <Link to="/cart"> Cart(
//                                 <span>{this.context.numberOfItems}</span>
//                             )
//                      </Link>
//                     </li>
//                 </ul>
//                 <div className="cart-corner">
//                 </div>
//             </div>
//         );
//     }

//     render () {
//         return (
//             <div className="menu">
//                 {this.mobileMenu()}
//                 {this.renderMenuComponents()}
//                 {/* {this.renderMenuComponents()} */}
//             </div>
//         );
//     }
// }

export default Menu;
