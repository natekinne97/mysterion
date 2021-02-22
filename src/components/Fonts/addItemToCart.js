import React, { useContext } from 'react'
import {get} from 'lodash'
import itemContext from '../../context/itemContext'
import { getLocalStorageItems } from '../../services/addItemToLocalStorage'
import { idGenerator } from './service'


const BuyOptions = ({ sectionName, fonts, price})=>{
    const {addItems, removeItem} = useContext(itemContext)
    if(!fonts)return null
    console.log(fonts, 'buyoptions')
    const currentCartItems = getLocalStorageItems()
    console.log(get(fonts, 'prices.individual'), 'price')
    const addToCart = (item)=>{
        console.log(item, 'item being added to cart')
        addItems(item)
    }  
    
    const removeFromCart = (item)=>{
        removeItem(item)
    }

    const addedToCart = (style, price)=>{
        const found = currentCartItems.find(item=> item.font == style)
        const createItem = {
            font: style,
            price: Number(price),
        }
        if(!found){
            return (
                <button className="add-product-button" onClick={()=>addToCart(createItem)}>
                    Add
                </button>
                )
        }else{
        return (
            <button className="add-product-button" onClick={()=>removeFromCart(createItem)}>
                Remove
            </button>
        )
        }
    }

    return (
        <div className="buy-options">
            <div className="price">
                <p>{sectionName}</p>
                <p>${price}</p>
            </div>
            <div className="product-options">
                {(fonts?.styles && sectionName === 'Individual') && fonts?.styles.map(style=>(
                    <div className="product" key={idGenerator(99)}>
                        <p>{style}</p>
                        {/* todo add the price key and name to the cart */}
                        {addedToCart(style, price)}
                    </div>
                ))}

                {(fonts?.pairs && sectionName === 'Pair')&& fonts?.pairs?.map(style=>(
                    <div className="product" key={idGenerator(99)}>
                        <p>{style}</p>
                        {/* todo add the price key and name to the cart */}
                        {addedToCart(style, price)}
                    </div>
                ))}

                {(fonts?.title && sectionName === 'Family') && (
                     <div className="product" key={idGenerator(999)}>
                        <p>{fonts?.title}</p>
                        {/* todo add the price key and name to the cart */}
                       {addedToCart(fonts?.title, price)}
                    </div>
                )}
            </div>
        </div>
    )
}

const AddItemToCart = (fonts)=>{
    if(!fonts)return null
    console.log(fonts, 'fonts')
    fonts = fonts?.fonts
    return (
        <div className="buy-font">
            <div className="buy-controls">
                <button className="license-selector pl-10">
                    Buy
                </button>
                <select className="license-selector">
                    {fonts?.license && fonts?.license.map(type=>(
                        <option value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="purchase-options">
                <BuyOptions sectionName="Individual" fonts={fonts} price={fonts?.prices?.individual} />
                <BuyOptions sectionName="Pair" fonts={fonts} price={fonts?.prices?.pair} />
                <BuyOptions sectionName="Family" fonts={fonts} price={fonts?.prices?.family}/>
            </div>
        </div>
    )
}

export default AddItemToCart