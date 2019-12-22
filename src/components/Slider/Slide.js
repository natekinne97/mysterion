import React from 'react';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';

const Slide = (props) => {
    const styles = {
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%',
        width: '98vw',
        height: '80vh',
    }
    
   
    return (
        <>
            <div className="slide" style={styles}>
                <LeftArrow
                    goToPrevSlide={props.goToPrevSlide}
                />
                <RightArrow
                    goToNextSlide={props.goToNextSlide}
                />
            </div>
        </>
    );
}

export default Slide