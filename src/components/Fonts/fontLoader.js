export const FontLoader = (name, url)=>{
    const text = document.getElementById(name)

    const customFont = new FontFace(name, `url(${url})`)
    customFont.load().then(loadedFont=>{
        document.fonts.add(loadedFont)
    }).catch(err=>{
        console.log('error', err)
    })
}