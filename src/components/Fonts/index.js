import React, { useEffect, useState } from 'react'
import './fonts.css'
import Slide from '../Slider/Slide'
import {getFontData, idGenerator} from './service'
import Multipolar from './multipolar'
import AddItemToCart from './addItemToCart'
import { get } from 'lodash'

// const fonts = {
//     title: 'Multipolar',
//     styles: [
//         'regular',
//         'regular italic',
//         'bold',
//         'bold italic',
//         'black',
//         'black italic'
//     ],
//     licenses: [
//         'Desktop'
//     ],
//     price: {
//         individual: 25,
//         pair: 45,
//         family: 120,
//     }
// }

const Fonts = ()=>{
    const [fonts, setFonts] = useState(null)


    useEffect(()=>{
       async function thing(){
           const data = await getFontData()
           setFonts(data)
       }
       thing()
    }, [])
   
    return (
        <div>
            {fonts?.length && fonts?.map((font)=>(
             <>
                <Slide 
                    image={get(font, 'overlayImage[0].image')} 
                    text={get(font, 'overlayImage[0].text')}
                    textColor={get(font, 'overlayImage[0].textColor')}
                    textPosition={get(font, 'overlayImage[0].textPosition')}
                />
                <Multipolar fonts={font} key={idGenerator(60)} />
                <AddItemToCart fonts={{...font}}key={idGenerator(60)}/>
             </>
            ))}
        </div>
    )
}

export default Fonts