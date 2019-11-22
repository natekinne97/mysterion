import React from 'react';
import roundSTORE from '../../STORE';

import './Work.css';
// this class renders work
// the main project will be rendere in a carousel
// click on it and it expands with more info
// displays review and company name over work
class Work extends React.Component{

    state={
        img: ''
    }

    slide(){
        return <div className="slide"></div>
    }

    rightArrow(){
        return(
            <div>
                
            </div>
        )
    }
  

    render(){
        return(
            <div className="work">
                
            </div>
        );
    }
}
export default Work;