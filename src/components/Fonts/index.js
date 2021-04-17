import React, { useEffect, useState } from 'react'
import './fonts.css'
import Slide from '../Slider/Slide'
import { getFontData, idGenerator } from './service'
import Multipolar from './multipolar'
import AddItemToCart from './addItemToCart'
import MetaData from '../Helmet'
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

const Fonts = () => {
    const [ fonts, setFonts ] = useState(null)
    const [ images, setImages ] = useState(null)
    const [ index, setIndex ] = useState(0)

    useEffect(() => {
        async function thing () {
            const { fonts, imagesArr } = await getFontData()
            setFonts(fonts)
            console.log(fonts, 'fonts')
            console.log(imagesArr, 'images')
            setImages(imagesArr[ 0 ])
        }
        thing()
    }, [])

    const nextSlide = () => {
        const len = images?.length - 1
        if (index === len) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    const prevSlide = () => {
        const len = images?.length - 1
        if (index === 0) {
            setIndex(len)
        } else {
            setIndex(index - 1)
        }
    }

    console.log(images, 'image')
    return (
        <div>
            <MetaData pageId={1} />
            {fonts?.length && fonts?.map((font) => (
                <>
                    <Slide
                        image={images ? images[ index ]?.image : ''}
                        text={images ? images[ index ]?.text : ''}
                        goToNextSlide={() => nextSlide()}
                        goToPrevSlide={() => prevSlide()}
                        textColor={images ? images[ index ]?.textColor : ''}
                        textPosition={images ? images[ index ]?.textPosition : ''}
                    />
                    <Multipolar fonts={font} key={idGenerator(60)} />
                    <AddItemToCart fonts={{ ...font }} key={idGenerator(60)} />
                </>
            ))}
        </div>
    )
}

export default Fonts
