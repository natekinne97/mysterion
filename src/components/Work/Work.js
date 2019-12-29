import React from 'react';
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
class Work extends React.Component{
    // this will be removed when we get the backend put together
    static defaultProps = {
        edit: false,
        highlights: false
    }
    constructor(props){
        super(props);
        this.state = {
            images: [],
            company: [],
            testimony: [],
            person: [],
            scope: [],
            bottomLine: [],
            logo: [],
            link: [],
            index: [],
            compClicked: [],
            remove: 'hidden',
            editWork: false,
            addWork: false,
            currentIndex: 0,
            translateValue: 0
        }
    }

    // in here we will run all of the image gathering calls
    componentDidMount(){
        this.getImg();
    }

    // this will run in didmount
    // it will make the call to the server to get all the images for the slide
    getImg(){


        // makes an array of all the images
        let img = roundSTORE.map(image =>{
            return image.img
        })
        // make an array of all the data
        let company = roundSTORE.map(data=>{
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
        for(let i=0; i<roundSTORE.length; i++){
            if(i=== 0)compClicked[i] = true;
            else compClicked[i] = false
        }

        this.setState({
            images: img,
            company: company,
            testimony: testimony,
            person: person,
            scope: scope,
            bottomLine: bottomLine,
            logo: logo,
            link: link,
            index: index,
            compClicked: compClicked
        }, ()=> console.log(this.state.data, 'data from state'))
        
    }

    // displays previous slide
    goToPrevSlide = () => {


        // get the list of companies and their color status
        let {compClicked} = this.state;
        // get the previous index
        const prevIndex = this.state.currentIndex;

        if (this.state.currentIndex === 0) {
            const end = this.state.images.length-1;
            compClicked[prevIndex] = false;
            compClicked[end] = true;
            return this.setState({
                currentIndex: end,
                compClicked: compClicked
            })
        }

        // change the previous index to false
        compClicked[prevIndex] = false;
        // change the clicked on index to true displaying the color
        compClicked[prevIndex-1] = true;

        // This will not run if we met the if condition above
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1,
            compClicked: compClicked
        }));

    }

    goToNextSlide = () => {

        // get the list of companies and their color status
        let {compClicked} = this.state;
        // get the previous index
        const prevIndex = this.state.currentIndex;


        // Exiting the method early if we are at the end of the images array.
        // We also want to reset currentIndex and translateValue, so we return
        // to the first image in the array.
        if (this.state.currentIndex === this.state.images.length - 1) {
            compClicked[prevIndex] = false;
            compClicked[0] = true;
            return this.setState({
                currentIndex: 0,
                compClicked: compClicked
            })
        }

        // change the previous index to false
        compClicked[prevIndex] = false;
        // change the clicked on index to true displaying the color
        compClicked[prevIndex+1] = true;

        // This will not run if we met the if condition above
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            companyClicked: compClicked
        }));
    }

    slideWidth = () => {
        return document.querySelector('.slide').clientWidth
    }
   
   

    handleEditSubmit = e =>{
        e.preventDefault();
        // get the value
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

        let stateObject = {
          images: this.state.images,
          company: this.state.company,
          testimony: this.state.testimony,
          person: this.state.person,
          scope: this.state.scope,
          bottomLine: this.state.bottomLine,
          logo: this.state.logo,
          link: this.state.link,
        };
        let index = this.state.currentIndex;

        // here we call out highlight update or our work update
        // based on the value
        
        stateObject.images[index] = formData.images;
        stateObject.company[index] = formData.company;
        stateObject.testimony[index] = formData.testimony;
        stateObject.person[index] = formData.person;
        stateObject.scope[index] = formData.scope;
        stateObject.bottomLine[index] = formData.scope;
        stateObject.logo[index] = formData.logo;
        stateObject.link[index] = formData.link;


        

        // change the state
        this.setState({
            ...stateObject
        })
       

    }

    // handles the adding the 
    handleAddSubmit = e =>{
        e.preventDefault();
        
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


        // here we call our insert but the inert depends on 
        // what area the update is going to


        let stateObject = {
          images: this.state.images,
          company: this.state.company,
          testimony: this.state.testimony,
          person: this.state.person,
          scope: this.state.scope,
          bottomLine: this.state.bottomLine,
          logo: this.state.logo,
          link: this.state.link,
        };
        // insert the new project in to the state
        for(const key of Object.keys(stateObject)){
            stateObject[key].push(formData[key]);
            console.log(stateObject[key], 'keys')
        }
        // change the currently highlighted image
        let compClicked = this.state.compClicked;
        compClicked[this.state.currentIndex] = false;
        compClicked[stateObject.images.length -1] = true;
      
        // insert into the state and then 
        this.setState({
            ...stateObject,
            currentIndex: stateObject.images.length -1,
            compClicked: compClicked,
            addWork: false
        })

    }

    // delete a portfolio project
    removeEntry = ()=>{
        /**
         * 
         * images: [],
            company: [],
            testimony: [],
            person: [],
            scope: [],
            bottomLine: [],
            logo: [],
            link: [],
            index: [],
            compClicked: [],
         */
        let {images, company, testimony, person, scope, bottomLine,
            logo, link, compClicked, currentIndex} = this.state;
        // remove image
        let companyArr = [];
        let imgArr = [];
        let testimonyArr = [];
        let personArr = [];
        let scopeArr = [];
        let bottomLineArr = [];
        let logoArr = [];
        let linkArr = [];
        let compClickedArr = [];
        
        // filter the arrays to 
        for(let i =0; i< images.length; i++){
            if(i !== currentIndex){
                imgArr.push(images[i]);
                companyArr.push(company[i]);
                testimonyArr.push(testimony[i]);
                personArr.push(person[i]);
                scopeArr.push(scope[i]);
                bottomLineArr.push(bottomLine[i]);
                logoArr.push(logo[i]);
                linkArr.push(link[i]);
                compClickedArr.push(compClicked[i]);
            }
            
        }
        
        this.setState({
            images: imgArr,
            company: companyArr,
            testimony: testimonyArr,
            person: personArr,
            scope: scopeArr,
            bottomLine: bottomLineArr,
            logo: logoArr,
            link: linkArr,
            compClicked: compClickedArr
        })
        // remove data
    }

    // this is the onclick for 
    renderEditFrom = ()=> {
        if(this.state.editWork && this.props.edit){
            this.setState({
                editWork: false
            })
            console.log('hiding editor')
        }else if(this.props.edit){
            this.setState({
               editWork: true 
            })
            console.log('displaying editor')
        }
    }

    renderAddForm = ()=>{
        if (this.state.addWork && this.props.edit) {
            console.log('hiding add form')
            this.setState({
                addWork: false
            })
            console.log('hiding editor')
        } else if (this.props.edit) {
            console.log('displaying add form')
            this.setState({
                addWork: true
            })
            console.log('displaying editor')
        }
    }

    // options are 
    // add, edit, remove
    renderOptions(){
        if(this.props.edit){
            return(
                <div className="edit-btn">
                    {/* add button */}
                    <FontAwesomeIcon icon={faPlusSquare} onClick={this.renderAddForm}/>
                    {/* edit button */}
                    <FontAwesomeIcon icon={faPencilAlt} onClick={this.renderEditFrom}/>
                    {/* remove button */}
                    <FontAwesomeIcon icon={faTrash} onClick={this.removeEntry}/>
                </div>  
            );
        }else{
            return null;
        }
    }


    companyClicked = id =>{
        // get the list of companies and their color status
        let {compClicked} = this.state;
        // get the previous index
        const prevIndex = this.state.currentIndex;
        // change the previous index to false
        compClicked[prevIndex] = false;
        // change the clicked on index to true displaying the color
        compClicked[id] = true;
        this.setState({
            compClicked: compClicked,
            currentIndex: id
        })

    }

    // renders slide with testimony and person who made the statement
    renderSlider(){
        const index = this.state.currentIndex ? this.state.currentIndex : 0;
        const testimony = this.state ? this.state.testimony[index] : 'It is great';
        const person = this.state ? this.state.person[index] : 'Karen'
        return (
          <div className="work-slide">
            <Slide
              goToPrevSlide={this.goToPrevSlide}
              goToNextSlide={this.goToNextSlide}
              edit={this.props.edit}
              key={this.state.currentIndex}
              image={this.state.images[this.state.currentIndex]}
            />
            {/* render the testimony and person who made it */}
            <p>{testimony}</p>
            <p>- {person}</p>
          </div>
        );
    }

    // render the full list of companies
    renderCompanies(){
        
        if(this.state.company.length > 0){
            const companies = this.state.company;
            const compClicked = this.state.compClicked;
    
            return (
              <div className="company-list-container">
                <ul className="company-list">
                  {companies.map((company, index) => (
                    <li
                      key={index ** 3}
                      className={`${compClicked[index] ? 'orange' : 'black'}`}
                      onClick={e => this.companyClicked(index)}
                    >
                      {company}
                    </li>
                  ))}
                </ul>
              </div>
            );
        }else{
            return null;
        }
    }

    // render the company and review from the company. 
    // this renders underneath the slide
    renderData(){
        const index = this.state.currentIndex;
        const scope = this.state.scope[index];
        const bottomLine = this.state.bottomLine[index];
        const visit = this.state.link[index];
        const logo = this.state.logo[index];
        const company = this.state.company[index];
        const imgStyle = {
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 60%"
        };
        return (
          <div className="work-data">
            <div className="work-entry">
              <h1>Scope</h1>
              <div className="orange-bar"></div>
              <p>{scope}</p>
            </div>
            <div className="work-entry">
              <h1>Bottom Line</h1>
              <div className="orange-bar"></div>
              <p>{bottomLine}</p>
            </div>
            <div className="work-entry">
              <h1>Go Check Em Out</h1>
              <div className='orange-bar'></div>
              <p>Click the link to visit their site</p>
              <a href={visit}>
                  <div className="logo-link" style={imgStyle} title={`logo for ${company}`}></div>
              </a>
            </div>
          </div>
        );
    }

    renderInstructions(){
        if(this.props.edit && this.props.highlights){
            return (
              <div>
                <h1>Edit or change Highlights</h1>
                <p>
                    Change highlights on the home page
                    or make a new homepage highlight.
                </p>
              </div>
            );
        }else if(this.props.edit){
            return (
                <div>
                    <h1>Work Page Edit</h1>
                    <p>Add/Edit/Delete work projects</p>
                </div>
            );
        }else{
            return null;
        }
    }


    render(){
        let {
          images,
          company,
          testimony,
          person,
          scope,
          bottomLine,
          logo,
          link,
          currentIndex
        } = this.state;
        return (
          <div className="work">
            <div className={`${this.props.edit ? "edit-work" : ""}`}>
                {this.renderInstructions()}
                {this.renderSlider()}
                {this.renderCompanies()}
                {this.renderData()}
                {/* render options */}
                {this.props.edit ?
                this.renderOptions()
                  : null}
                    {/* for editing this component */}
                    {this.state.editWork ? (
                    <EditForm
                        images={images}
                        company={company}
                        testimony={testimony}
                        person={person}
                        scope={scope}
                        bottomLine={bottomLine}
                        logo={logo}
                        link={link}
                        currentIndex={currentIndex}
                        handleFormSubmit={this.handleEditSubmit}
                    />
                 ) : null}

              {/* for adding to this component */}
              {this.state.addWork ? (
                <AddWork handleFormSubmit={this.handleAddSubmit} />
              ) : null}
            </div>
          </div>
        );
    }
}
export default Work;