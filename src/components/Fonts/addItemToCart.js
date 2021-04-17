import React, { useContext } from 'react'
import { get } from 'lodash'
import itemContext from '../../context/itemContext'
import { getLocalStorageItems } from '../../services/addItemToLocalStorage'
import { idGenerator } from './service'
import { FontLoader } from './fontLoader'
import fontStyles from './fontStyle'

const BuyOptions = ({ sectionName, fonts, price }) => {
    const { addItems, removeItem } = useContext(itemContext)
    if (!fonts) return null
    const currentCartItems = getLocalStorageItems()
    const fontFileUrl = get(fonts, 'fontFileName')

    const addToCart = (item) => {
        addItems(item)
    }

    const removeFromCart = (item) => {
        removeItem(item)
    }

    const addedToCart = (style, price) => {
        const found = currentCartItems.find(item => item.font == style)
        const createItem = {
            font: style,
            price: Number(price),
        }
        if (!found) {
            return (
                <button className={`${fontStyles.addToCartButton}`} onClick={() => addToCart(createItem)}>
                    Add
                </button>
            )
        } else {
            return (
                <button className={fontStyles.addToCartButton} onClick={() => removeFromCart(createItem)}>
                    Remove
                </button>
            )
        }
    }

    return (
        <div className={`${fontStyles.buyOptions}`}>
            <div className={`${fontStyles.price}`}>
                <p>{sectionName}</p>
                <p>${price}</p>
            </div>
            <div className={fontStyles.productOptions}>
                {(fonts?.styles && sectionName === 'Individual') && fonts?.styles.map(style => (
                    <div className={fontStyles.product} key={idGenerator(99)}>
                        {FontLoader(style, fontFileUrl[ style ])}
                        <p id={style} style={{ fontFamily: style }} className="thing">{style}</p>
                        {/* todo add the price key and name to the cart */}
                        {addedToCart(style, price)}
                    </div>
                ))}

                {(fonts?.pairs && sectionName === 'Pair') && fonts?.pairs?.map(style => (
                    <div className={fontStyles.product} key={idGenerator(99)}>
                        <p id="">{style}</p>
                        {/* todo add the price key and name to the cart */}
                        {addedToCart(style, price)}
                    </div>
                ))}

                {(fonts?.title && sectionName === 'Family') && (
                    <div className={fontStyles.product} key={idGenerator(999)}>
                        <p>{fonts?.title}</p>
                        {/* todo add the price key and name to the cart */}
                        {addedToCart(fonts?.title, price)}
                    </div>
                )}
            </div>
        </div>
    )
}

const AddItemToCart = (fonts) => {
    if (!fonts) return null

    fonts = fonts?.fonts

    return (
        <div className="buy-font">
            <div className={fontStyles.buyControls}>
                <button className="license-selector">
                    Buy
                </button>
                <select className="license-selector">
                    {fonts?.license && fonts?.license.map(type => (
                        <option key={idGenerator(201)} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className={fontStyles.purchaseOptions}>
                <BuyOptions sectionName="Individual" fonts={fonts} price={fonts?.prices?.individual} />
                <BuyOptions sectionName="Pair" fonts={fonts} price={fonts?.prices?.pair} />
                <BuyOptions sectionName="Family" fonts={fonts} price={fonts?.prices?.family} />
            </div>
        </div>
    )
}

export default AddItemToCart
