import React from 'react';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import { pickBy, identity } from 'lodash';

const Slide = (props) => {
  
    const styles = {
      backgroundImage: `url(${props.image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: props.edit ? "50vw" : "98vw",
      height: "80vh",
      color: props.textColor
    };
    
   
    return (
      <>
        <div
          className={`slide ${props.edit ? "edit-work" : ""}`}
          style={pickBy(styles, identity)}
        >
          <LeftArrow goToPrevSlide={props.goToPrevSlide} />
          {props?.text && (
            <p>hello</p>
          )}
          <RightArrow goToNextSlide={props.goToNextSlide} />
        </div>
      </>
    );
}

export default Slide