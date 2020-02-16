import React, {useState, useEffect} from 'react';
import Slide from '../Slider/Slide'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './Work.css';
// change the data
import EditForm from '../../adminComponents/EditWork/EditWork';
import AddWork from '../../adminComponents/AddWork/Addwork';
import config from '../../config';

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
  const [showEditform, setEditForm] = useState(false);
  const [showAddForm, setAddForm] = useState(false);

  useEffect(()=>{
    fetch(`${config.API_ENDPOINT}`)
      .then(response=> response.json())
      .then(allData=>{
        let allItems = sortData(allData);
        // for checking if a company has been clicked
        let thing = generateCompanyClicks(allItems);
        setComp(thing);
        setData(allItems);
      });

  }, []);
  // if(data != 'undefined'){
  //   console.log(data, 'data')
  // }
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

  const RenderEditForm = (e)=>{
    if(showEditform){
      setEditForm(false);
      setAddForm(false);
    }else{
      setEditForm(true);
      setAddForm(false);
    }
  }

  const RenderAddForm = (e) => {
    if (showAddForm) {
      setAddForm(false);
      setEditForm(false);
    } else {
      setAddForm(true);
      setEditForm(false);
    }
  }
  
  // only render if there is data
  if(data){
    
    return (
      <div className="work">
        <div className={`${props.edit ? "edit-work" : ""}`}>
          {/* index, compIndex,  data, prevSlideNumber, nextSlideNumber */}
          {RenderSlider(Number(index), Number(compIndex), data, prevSlideNumber, nextSlideNumber)}

          {renderCompanies(data, compClicked, companyClicked)}
          {/* compIndex, data */}
          { RenderWorkData(compIndex, data)}

          {/* Render testimony */}
          <p>"{data[compIndex].testimony}"</p>
          <p>- {data[compIndex].person}</p>
          {props.edit ?
            <RenderOptions
              renderEditform={e => { RenderEditForm() }}
              renderAddForm={RenderAddForm}
            />
            : null}

          {showEditform ?
            <EditForm
              data={data}
              currentIndex={index}
              handleFormSubmit={e => {
                e.preventDefault();
                // returns the updated data
                const updated = handleEditSubmit(e, data, index);
                setData(updated);
                setEditForm(false);
              }}
            />
          : null}

          {showAddForm ?
          <AddWork 
            handleFormSubmit={e=>{
              e.preventDefault()
              const added = handleAddSubmit(e, data, index);
             
              setData(prevData=> added);
              setAddForm(false);
            }}
          />
          : null}



        </div>
      </div>
    );

  }else{
    return null
  }
  // className={`${props.edit ? "edit-work" : ""}`}
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

export const handleEditSubmit = (e, data, index) =>{
  let formData = {
    images: e.target.image.value,
    company: e.target.company.value,
    testimony: e.target.testimony.value,
    person: e.target.person.value,
    scope: e.target.scope.value,
    bottomLine: e.target.bottomline.value,
    logo: e.target.logo.value,
    link: e.target.link.value,
  }
  // updating data to reflect the change 
  data.images[index] = formData.images;
  data.company[index] = formData.company;
  data.testimony[index] = formData.testimony;
  data.person[index] = formData.person;
  data.scope[index] = formData.scope;
  data.bottomLine[index] = formData.bottomLine;
  data.logo[index] = formData.logo;
  data.link[index] = formData.link;

  return data;
} 

export const handleAddSubmit = (e, data, index)=>{
  let formData = {
  };
  formData.images = e.target.image.value;
  formData.company = e.target.company.value;
  formData.testimony = e.target.testimony.value;
  formData.person = e.target.person.value;
  formData.scope = e.target.scope.value;
  formData.bottomLine = e.target.bottomline.value;
  formData.logo = e.target.logo.value;
  formData.link = e.target.link.value;
  

  data.images.push(formData.images);
  data.company.push(formData.company);
  data.testimony.push(formData.testimony);
  data.person.push(formData.person);
  data.scope.push(formData.scope);
  data.bottomLine.push(formData.bottomLine);
  data.logo.push(formData.logo);
  data.link.push(formData.link);

  return data;
}

export const RenderOptions = (props)=>{
  return (
    <div className="edit-btn">
      {/* add button */}
      <FontAwesomeIcon icon={faPlusSquare} onClick={props.renderAddForm} />
      {/* edit button */}
      <FontAwesomeIcon icon={faPencilAlt} onClick={props.renderEditform} />
      {/* remove button */}
      <FontAwesomeIcon icon={faTrash} onClick={props.removeEntry} />
    </div>
  );
}


export const sortData = (allData)=>{
  // get all of the items
  let item = allData.items;
  // get the assets ie image urls
  let assets = allData.includes.Asset;

  let allItems = [];

  // start at the first item.
  for (let i = 0; i < item.length; i++) {
    // console.log(item[i].fields.images.length, )
    let imgArr = item[i].fields.images;
    let imgCont = [];
    let logo = '';

    // loop through images
    for (let imgs = 0; imgs < imgArr.length; imgs++) {
      // loop through assets
      for (let a = 0; a < assets.length; a++) {
        // extract the images
        // check if the asset id is the same as the image id
        if (assets[a].sys.id === item[i].fields.images[imgs].sys.id) {
          imgCont.push(assets[a].fields.file.url);
        }


        // extract the logos
        if (assets[a].sys.id === item[i].fields.logo.sys.id) {
          // set the logo for the current item to the url
          // minus the // in the url
          logo = assets[a].fields.file.url;
        }
      }
    }

    // insert the items into a custom array of objects
    // for better control
    allItems.push(
      {
        images: imgCont,
        company: item[i].fields.company,
        testimony: item[i].fields.testimony,
        person: item[i].fields.person,
        scope: item[i].fields.scope,
        bottomLine: item[i].fields.bottomLine,
        logo: logo,
        link: item[i].fields.bottomLine,
        highlight: item[i].fields.highlight
      }
    );
  }
  return allItems;
}

// this is a function that adds on to the sort data. 
// you first get the sorted data and this function returns only
// the highlight
export const findHighlight = (allData)=>{
  return allData.filter(data=> {
    if(data.highlight)return data;
  })
}