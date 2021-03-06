import React, {useState, useEffect} from 'react';
import Slide from '../Slider/Slide';
import {getProjects} from '../Services/service';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPencilAlt, faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './Work.css';

// this class renders work
// the main project will be rendere in a carousel
// click on it and it expands with more info
// displays review and company name over work
// for better code reuse we are going to add all of the editing and removing in here
// the adding will be lower down since in the static version we are going to 
// be using the state
// the work class  only takes a single pic from each company


// displays all the work data
export  const Work = (props)=>{
  const [data, setData] = useState(null);
  // for controlling which image is displayed
  const [index, setIndex] = useState(0);
  // showing which company index is diplayed
  const [compIndex, setCompIndex] = useState(0);
  // highlights the company clicked on
  const [compClicked, setComp] = useState(null);
  getProjects("project");

  useEffect(()=>{
    async function fetchStuff() {
      const projects = await getProjects("project");
      let clicks = await generateCompanyClicks(projects);
      setComp(clicks);
      setData(projects);
    }
    fetchStuff();
  }, []);

  // go to previous slide
  const prevSlideNumber = (i)=>{
    if (i === 0) {
      let length = data[compIndex].images.length-1
      setIndex(length)
    } else {
      let tmp = index;
      setIndex(tmp-1);
    }
  
  }

  // go to the next slide
  const nextSlideNumber = (i) => {
    if(i === data[compIndex].images.length-1){
      setIndex(0)
    }else{
      let tmp = index;
      setIndex(tmp+1);
    }
  }
  // when a company is clicked change the color and the content
  const companyClicked = id =>{
    // get the array of active company
    let active = compClicked;
    // use the company index to change the previous active to false
    active[compIndex] = false;
    // set the clicked company to active
    active[id] = true;
    // initiate the change for the active company
    setComp(active);
    // change company index for a different set of images
    setCompIndex(id);

  }

  // only render if there is data
  if(data){
    
    return (
      <div className="work">
        <div>
          {/* index, compIndex,  data, prevSlideNumber, nextSlideNumber */}
          {RenderSlider(Number(index), Number(compIndex), data, prevSlideNumber, nextSlideNumber)}

          {renderCompanies(data, compClicked, companyClicked)}
          {/* compIndex, data */}
          { RenderWorkData(compIndex, data)}

          {/* Render testimony */}
          <p>"{data[compIndex].testimony}"</p>
          <p>- {data[compIndex].person}</p>
         
        </div>
      </div>
    );

  }else{
    return null
  }
  
};



// this class displays all the work data for the given company
// based on the index. the index is passed in and 
// so are the rest of the data storing arrays
export const RenderWorkData = (compIndex, data, home=null)=>{
  const imgStyle = {
    backgroundImage: `url(${home ? data.logo : data[compIndex].logo})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 60%"
  };
 
  return (
    <div className="work-data">
      <div className="work-entry">
        <h1>Scope</h1>
        <div className="orange-bar"></div>
        <p>{home ? data.scope : data[compIndex].scope}</p>
      </div>
    {/* go check em out */}
      <div className="work-entry">
        <h1>Go Check Em Out</h1>
        <div className='orange-bar'></div>
        <p>Click the link to visit their site</p>
        <a href={home ? data.visit : data[compIndex].visit}>
          <div className="logo-link" style={imgStyle} title={`logo for ${home ? data.company : 
            data[compIndex].company}`}></div>
        </a>
      </div>
      {/* bottom line */}
      <div className="work-entry">
        <h1>Bottom Line</h1>
        <div className="orange-bar"></div>
        <p>{home ? data.bottomLine : data[compIndex].bottomLine}</p>
      </div>

    </div>
  );
}

// renders the slider
export const RenderSlider = (index, compIndex,  data, prevSlideNumber, nextSlideNumber)=>{
  if(typeof index !== 'number'){
    console.log('Error Index must be a number');
    return null;
  }
  return (
    <div className="work-slide">
      <Slide
        goToPrevSlide={()=>{
          prevSlideNumber(index);
        }}
        goToNextSlide={()=>{
         nextSlideNumber(index);
        }}
        edit={false}
        key={index}
        image={data[compIndex].images[index]}
      />
     
    </div>
  );
}


export const renderCompanies = ( data, compClicked, companyClicked)=>{
  if(data.length > 0){
    return (
      <div className="company-list-container">
        <ul className="company-list">
          {data.map((comp, i) => (
            <li
              key={i ** 3}
              className={`${compClicked[i] ? 'orange' : 'black'}`}
              onClick={e => {
                companyClicked(i)
              }}
            >
              {comp.company}
            </li>
          ))}
       
        </ul>
      </div>
    );
  }  else{
    console.log('no data')
  }

}

// generates an array of bools that track which one was clicked
// not exported because it doesn't need to be it will be used locally in this component
const generateCompanyClicks = (data)=>{
  let compClicks = [];
  for(let i =0; i<data.length; i++){
    if(i === 0)compClicks.push(true);
    compClicks.push(false);
  }
 
  return compClicks;
}

