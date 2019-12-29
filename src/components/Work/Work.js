import React, {useState, useEffect} from 'react';
import roundSTORE from '../../STORE';
import Slide from '../Slider/Slide'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './Work.css';
// change the data
import EditForm from '../../adminComponents/EditWork/EditWork';
import AddWork from '../../adminComponents/AddWork/Addwork';
// this class renders work
// the main project will be rendere in a carousel
// click on it and it expands with more info
// displays review and company name over work
// for better code reuse we are going to add all of the editing and removing in here
// the adding will be lower down since in the static version we are going to 
// be using the state
// the work class  only takes a single pic from each company
// 

export  const Work = (props)=>{
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(()=>{
    const allData = getData();
    setData(allData);
  }, []);

  // go to previous slide
  const prevSlideNumber = (i, compClicked)=>{
    console.log('changing slide')
    console.log(index, 'index befor update');
    setData(prevData=>{
      return {
        ...prevData,
        compClicked
      }
    });
    setIndex(i, 'index');
    console.log(index, 'data after thing');
  }

  // go to the next slide
  const nextSlideNumber = (i, compClicked) => {
    setData(prevData => {
      return {
        ...prevData,
        compClicked
      }
    });
    setIndex(i, 'index');
  }
  // when a company is clicked change the color and the content
  const companyClicked = id =>{
    let compClicked = data.compClicked;
    // change the previous state to false
    compClicked[index] = false;
    // change the next index to be true
    compClicked[Number(id)] = true;
    setIndex(Number(id));
    setData(prevData => {
      return {
        ...prevData,
        compClicked
      }
    });

  }
  
  // only render if there is data
  if(data){
    return (
      <div className="work">
        <div >
          {RenderSlider(Number(index), data.images, data.testimony,
           data.person, data.compClicked, prevSlideNumber, nextSlideNumber)}

          {renderCompanies(index, data.company, data.compClicked, companyClicked)}

          {RenderWorkData(Number(index), data.scope, data.bottomLine, 
          data.link, data.logo, data.company)}
        </div>
      </div>
    );

  }else{
    return <h1>fuck my life</h1>
  }
  // className={`${props.edit ? "edit-work" : ""}`}

}

// gets all the data for the component
// will be modified for reuse when api is finished
const getData = ()=>{

  // makes an array of all the images
  let img = roundSTORE.map(image => {
    return image.img
  })
  // make an array of all the data
  let company = roundSTORE.map(data => {
    return data.company;
  })

  let testimony = roundSTORE.map(data => {
    return data.testimony;
  })

  let person = roundSTORE.map(data => {
    return data.person;
  });

  let scope = roundSTORE.map(data => {
    return data.scope;
  });

  let bottomLine = roundSTORE.map(data => {
    return data.bottomLine;
  });

  let logo = roundSTORE.map(data => {
    return data.logo;
  });

  let link = roundSTORE.map(data => {
    return data.link;
  });


  let index = roundSTORE.map((data, index) => {
    return index;
  });

  let compClicked = [];
  for (let i = 0; i < roundSTORE.length; i++) {
    if (i === 0) compClicked[i] = true;
    else compClicked[i] = false
  }
 
  const obj = {
    images: Object.values(img),
    company: Object.values(company),
    testimony: Object.values(testimony),
    person: Object.values(person),
    scope: Object.values(scope),
    bottomLine: Object.values(bottomLine),
    logo: Object.values(logo),
    link: Object.values(link),
    index: Object.values(index),
    compClicked: Object.values(compClicked)
  }

  return obj;

}



// this class displays all the work data for the given company
// based on the index. the index is passed in and 
// so are the rest of the data storing arrays
export const RenderWorkData = (index, scope, bottomLine, visit, logo, company)=>{
  const imgStyle = {
    backgroundImage: `url(${(logo[index])})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 60%"
  };
  console.log(visit);
  // return <h1>fuck</h1>
  return (
    <div className="work-data">
      <div className="work-entry">
        <h1>Scope</h1>
        <div className="orange-bar"></div>
        <p>{scope[index]}</p>
      </div>
      <div className="work-entry">
        <h1>Bottom Line</h1>
        <div className="orange-bar"></div>
        <p>{bottomLine[index]}</p>
      </div>
      <div className="work-entry">
        <h1>Go Check Em Out</h1>
        <div className='orange-bar'></div>
        <p>Click the link to visit their site</p>
        <a href={visit[index]}>
          <div className="logo-link" style={imgStyle} title={`logo for ${company[index]}`}></div>
        </a>
      </div>
    </div>
  );
}

 
export const RenderSlider = (index, image, testimony, person, 
  compClicked, prevSlideNumber, nextSlideNumber)=>{
  if(typeof index !== 'number'){
    console.log('Error Index must be a number');
    return null;
  }


  return (
    <div className="work-slide">
      <Slide
        goToPrevSlide={()=>{
          PrevSlide(index, compClicked, prevSlideNumber)
        }}
        goToNextSlide={()=>{
          NextSlide(index, compClicked, nextSlideNumber);
        }}
        edit={false}
        key={index}
        image={image[index]}
      />
      {/* render the testimony and person who made it */}
      <p>{testimony[index]}</p>
      <p>- {person[index]}</p>
    </div>
  );
}


export const PrevSlide = (index, compClicked, prevSlideNumber)=>{
  // get the previous index
  const prevIndex = index;
  // if the index is 0
  // then set the previoud index to have false in the compClicked
  if (index === 0) {
    const end = compClicked.length - 1;
    compClicked[prevIndex] = false;
    compClicked[end] = true;
    return prevSlideNumber(index=end, compClicked);
  }
  // change the previous index to false
  compClicked[prevIndex] = false;
  // change the clicked on index to true displaying the color
  compClicked[prevIndex - 1] = true;
  console.log('changing data');
  return prevSlideNumber(index-1, compClicked);
}

export const NextSlide = (index, compClicked, nextSlideNumber)=>{
  // Exiting the method early if we are at the end of the images array.
  // We also want to reset currentIndex and translateValue, so we return
  // to the first image in the array.
  if (index === compClicked.length - 1) {
    compClicked[index] = false;
    compClicked[0] = true;
    return nextSlideNumber(index = 0, compClicked);
  }


  // change the previous index to false
  compClicked[index] = false;
  // change the clicked on index to true displaying the color
  compClicked[index + 1] = true;

  // This will not run if we met the if condition above
  return nextSlideNumber(index+1, compClicked);
}

export const renderCompanies = (index, company, compClicked, companyClicked)=>{
 
  return (
    <div className="company-list-container">
      <ul className="company-list">
        {company.map((comp, i) => (
          <li
            key={i ** 3}
            className={`${compClicked[i] ? 'orange' : 'black' }`}
            onClick={e => companyClicked(i)}
          >
            {comp}
          </li>
        ))}
      </ul>
    </div>
  );
}

        


   
   
//     handleEditSubmit = e =>{
//         e.preventDefault();
//         // get the value
//         let formData = {  
//           images: e.target.image.value,
//           company: e.target.company.value,
//           testimony: e.target.testimony.value,
//           person: e.target.person.value,
//           scope: e.target.scope.value,
//           bottomLine: e.target.bottomline.value,
//           logo: e.target.logo.value,
//           link: e.target.link.value,
//         }

//         let stateObject = {
//           images: this.state.images,
//           company: this.state.company,
//           testimony: this.state.testimony,
//           person: this.state.person,
//           scope: this.state.scope,
//           bottomLine: this.state.bottomLine,
//           logo: this.state.logo,
//           link: this.state.link,
//         };
//         let index = this.state.currentIndex;

//         // here we call out highlight update or our work update
//         // based on the value
        
//         stateObject.images[index] = formData.images;
//         stateObject.company[index] = formData.company;
//         stateObject.testimony[index] = formData.testimony;
//         stateObject.person[index] = formData.person;
//         stateObject.scope[index] = formData.scope;
//         stateObject.bottomLine[index] = formData.scope;
//         stateObject.logo[index] = formData.logo;
//         stateObject.link[index] = formData.link;


        

//         // change the state
//         this.setState({
//             ...stateObject
//         })
       

//     }

//     // handles the adding the 
//     handleAddSubmit = e =>{
//         e.preventDefault();
        
//         let formData = {  
//           images: e.target.image.value,
//           company: e.target.company.value,
//           testimony: e.target.testimony.value,
//           person: e.target.person.value,
//           scope: e.target.scope.value,
//           bottomLine: e.target.bottomline.value,
//           logo: e.target.logo.value,
//           link: e.target.link.value,
//         }


//         // here we call our insert but the inert depends on 
//         // what area the update is going to


//         let stateObject = {
//           images: this.state.images,
//           company: this.state.company,
//           testimony: this.state.testimony,
//           person: this.state.person,
//           scope: this.state.scope,
//           bottomLine: this.state.bottomLine,
//           logo: this.state.logo,
//           link: this.state.link,
//         };
//         // insert the new project in to the state
//         for(const key of Object.keys(stateObject)){
//             stateObject[key].push(formData[key]);
//             console.log(stateObject[key], 'keys')
//         }
//         // change the currently highlighted image
//         let compClicked = this.state.compClicked;
//         compClicked[this.state.currentIndex] = false;
//         compClicked[stateObject.images.length -1] = true;
      
//         // insert into the state and then 
//         this.setState({
//             ...stateObject,
//             currentIndex: stateObject.images.length -1,
//             compClicked: compClicked,
//             addWork: false
//         })

//     }

//     // delete a portfolio project
//     removeEntry = ()=>{
//         /**
//          * 
//          * images: [],
//             company: [],
//             testimony: [],
//             person: [],
//             scope: [],
//             bottomLine: [],
//             logo: [],
//             link: [],
//             index: [],
//             compClicked: [],
//          */
//         let {images, company, testimony, person, scope, bottomLine,
//             logo, link, compClicked, currentIndex} = this.state;
//         // remove image
//         let companyArr = [];
//         let imgArr = [];
//         let testimonyArr = [];
//         let personArr = [];
//         let scopeArr = [];
//         let bottomLineArr = [];
//         let logoArr = [];
//         let linkArr = [];
//         let compClickedArr = [];
        
//         // filter the arrays to 
//         for(let i =0; i< images.length; i++){
//             if(i !== currentIndex){
//                 imgArr.push(images[i]);
//                 companyArr.push(company[i]);
//                 testimonyArr.push(testimony[i]);
//                 personArr.push(person[i]);
//                 scopeArr.push(scope[i]);
//                 bottomLineArr.push(bottomLine[i]);
//                 logoArr.push(logo[i]);
//                 linkArr.push(link[i]);
//                 compClickedArr.push(compClicked[i]);
//             }
            
//         }
        
//         this.setState({
//             images: imgArr,
//             company: companyArr,
//             testimony: testimonyArr,
//             person: personArr,
//             scope: scopeArr,
//             bottomLine: bottomLineArr,
//             logo: logoArr,
//             link: linkArr,
//             compClicked: compClickedArr
//         })
//         // remove data
//     }

//     // this is the onclick for 
//     renderEditFrom = ()=> {
//         if(this.state.editWork && this.props.edit){
//             this.setState({
//                 editWork: false
//             })
//             console.log('hiding editor')
//         }else if(this.props.edit){
//             this.setState({
//                editWork: true 
//             })
//             console.log('displaying editor')
//         }
//     }

//     renderAddForm = ()=>{
//         if (this.state.addWork && this.props.edit) {
//             console.log('hiding add form')
//             this.setState({
//                 addWork: false
//             })
//             console.log('hiding editor')
//         } else if (this.props.edit) {
//             console.log('displaying add form')
//             this.setState({
//                 addWork: true
//             })
//             console.log('displaying editor')
//         }
//     }

//     // options are 
//     // add, edit, remove
//     renderOptions(){
//         if(this.props.edit){
//             return(
//                 <div className="edit-btn">
//                     {/* add button */}
//                     <FontAwesomeIcon icon={faPlusSquare} onClick={this.renderAddForm}/>
//                     {/* edit button */}
//                     <FontAwesomeIcon icon={faPencilAlt} onClick={this.renderEditFrom}/>
//                     {/* remove button */}
//                     <FontAwesomeIcon icon={faTrash} onClick={this.removeEntry}/>
//                 </div>  
//             );
//         }else{
//             return null;
//         }
//     }




//     // renders slide with testimony and person who made the statement
//     renderSlider(){
//         const index = this.state.currentIndex ? this.state.currentIndex : 0;
//         const testimony = this.state ? this.state.testimony[index] : 'It is great';
//         const person = this.state ? this.state.person[index] : 'Karen'
        // return (
        //   <div className="work-slide">
        //     <Slide
        //       goToPrevSlide={this.goToPrevSlide}
        //       goToNextSlide={this.goToNextSlide}
        //       edit={this.props.edit}
        //       key={this.state.currentIndex}
        //       image={this.state.images[this.state.currentIndex]}
        //     />
        //     {/* render the testimony and person who made it */}
        //     <p>{testimony}</p>
        //     <p>- {person}</p>
        //   </div>
        // );
//     }

//     // render the full list of companies
//     renderCompanies(){
        
//         if(this.state.company.length > 0){
//             const companies = this.state.company;
//             const compClicked = this.state.compClicked;

//         }else{
//             return null;
//         }
//     }


//     renderInstructions(){
//         if(this.props.edit && this.props.highlights){
//             return (
//               <div>
//                 <h1>Edit or change Highlights</h1>
//                 <p>
//                     Change highlights on the home page
//                     or make a new homepage highlight.
//                 </p>
//               </div>
//             );
//         }else if(this.props.edit){
//             return (
//                 <div>
//                     <h1>Work Page Edit</h1>
//                     <p>Add/Edit/Delete work projects</p>
//                 </div>
//             );
//         }else{
//             return null;
//         }
//     }


//     render(){
//         let {
//           images,
//           company,
//           testimony,
//           person,
//           scope,
//           bottomLine,
//           logo,
//           link,
//           currentIndex
//         } = this.state;
//         return (
//           <div className="work">
//             <div className={`${this.props.edit ? "edit-work" : ""}`}>
//                 {this.renderInstructions()}
//                 {this.renderSlider()}
//                 {this.renderCompanies()}
//                 {this.renderData()}
//                 {/* render options */}
//                 {this.props.edit ?
//                 this.renderOptions()
//                   : null}
//                     {/* for editing this component */}
//                     {this.state.editWork ? (
//                     <EditForm
//                         images={images}
//                         company={company}
//                         testimony={testimony}
//                         person={person}
//                         scope={scope}
//                         bottomLine={bottomLine}
//                         logo={logo}
//                         link={link}
//                         currentIndex={currentIndex}
//                         handleFormSubmit={this.handleEditSubmit}
//                     />
//                  ) : null}

//               {/* for adding to this component */}
//               {this.state.addWork ? (
//                 <AddWork handleFormSubmit={this.handleAddSubmit} />
//               ) : null}
//             </div>
//           </div>
//         );
//     }
// }
// export default Work;