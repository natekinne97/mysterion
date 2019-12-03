
import React from 'react'

const Slide = ({image}) => {
    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%'
    }
    console.log(image, 'image');
    return <div className="slide" style={styles}></div>
}

export default Slide