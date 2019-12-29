import React from 'react';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';

const Slide = (props) => {
    console.log(props.edit, 'edit');
    const styles = {
      backgroundImage: `url(${props.image})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 60%",
      width: props.edit ? "50vw" : "98vw",
      height: "80vh"
    };
    
   
    return (
      <>
        <div
          className={`slide ${props.edit ? "edit-work" : ""}`}
          style={styles}
        >
          <LeftArrow goToPrevSlide={props.goToPrevSlide} />
          <RightArrow goToNextSlide={props.goToNextSlide} />
        </div>
      </>
    );
}

export default Slide