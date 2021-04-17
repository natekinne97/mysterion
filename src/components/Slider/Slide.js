import React from 'react';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import { pickBy, identity } from 'lodash';

const Slide = (props) => {

  const styles = {
    backgroundImage: `url(${props.image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "80vh",
    color: props.textColor
  };


  return (
    <>
      <div
        className={`slide text-${props?.textColor} text-${props?.textPosition} w-full`}
        style={pickBy(styles, identity)}
      >
        <LeftArrow goToPrevSlide={props.goToPrevSlide} />
        {props?.text && (
          <p>{props?.text}</p>
        )}
        <RightArrow goToNextSlide={props.goToNextSlide} />
      </div>
    </>
  );
}

export default Slide
