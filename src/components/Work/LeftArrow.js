import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const LeftArrow = (props) => {
    return (
        <div className="backArrow" onClick={props.goToPrevSlide}>
            <i aria-hidden="true"><FontAwesomeIcon icon={faArrowLeft} /></i>
        </div>
    );
}

export default LeftArrow;