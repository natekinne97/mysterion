import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const RightArrow = (props) => {
    return (
        <div className="nextArrow" onClick={props.goToNextSlide}>
            <i  aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></i>
        </div>
    );
}

export default RightArrow;
