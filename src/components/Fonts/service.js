import client from '../Services/ContentfulConfig'
import {get} from 'lodash'

export const idGenerator = (max)=>{
    return Math.floor(Math.random() * Math.floor(max))
}

const mapFontData = (data)=>{
    const items = get(data, 'items')
    console.log(data, 'data')
  
    let fonts = []
    items.forEach(item=>{

        const fields = get(item, 'fields')
        console.log(fields, 'fields')
        console.log(get(fields, 'textImageOverlay'), 'things')
        const textImageOverlay = get(fields, 'textImageOverlay')
        let overlayImage = []
        if(textImageOverlay?.length){
            textImageOverlay.forEach(elem => {
                console.log(elem, 'elem')
                overlayImage.push({
                    text: get(elem?.fields, 'text'),
                    textColor: get(elem?.fields, 'textColor[0]'),
                    image: get(elem?.fields, 'image.fields.file.url'),
                    textPosition: get(elem?.fields, 'textPosition[0]')
                })
             })
        }

        const styles = get(fields, 'styles')
        fonts.push({
            title: get(fields, 'title'),
            styles,
            prices: {
                individual: get(fields, 'individual'),
                family: get(fields, 'family'),
                pair: get(fields, 'pair')
            },
            license: get(fields, 'license'),
            pairs: get(fields, 'paring'),
            overlayImage: overlayImage
        })
    })
    return fonts
}

export const getFontData = async ()=>{
    let projects = await client.getEntries({
      content_type: 'fonts',
      resolveLinks: true,
    });
    return mapFontData(projects)
}