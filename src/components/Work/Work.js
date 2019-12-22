import React from 'react';
import roundSTORE from '../../STORE';
import Slide from '../Slider/Slide'
import LeftArrow from '../Slider/LeftArrow'
import RightArrow from '../Slider/RightArrow'

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
        edit: false
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
        if (this.state.currentIndex === this.state.images.length - 1) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }

        // This will not run if we met the if condition above
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1,
            // translateValue: prevState.translateValue + -(this.slideWidth())
        }));

    }

    goToNextSlide = () => {
        // Exiting the method early if we are at the end of the images array.
        // We also want to reset currentIndex and translateValue, so we return
        // to the first image in the array.
        if (this.state.currentIndex === this.state.images.length - 1) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }

        // This will not run if we met the if condition above
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            // translateValue: prevState.translateValue + -(this.slideWidth())
        }));
    }

    slideWidth = () => {
        return document.querySelector('.slide').clientWidth
    }
   
   

    handleEditSubmit = e =>{
        e.preventDefault();
        // get the value
        const {image, company, review} = e.target;
        // get the state data
        let data = this.state.data;
        let img = this.state.images;
        let index = this.state.currentIndex;
        // update the image
        img[index] = image.value;
        // update the data
        data[index] = {
            company: company.value,
            review: review.value
        }
        // change the state
        this.setState({
            images: img,
            data: data,
            editWork: false
        })
        // empty the inputs
        image.value = '';
        company.value = '';
        review.value = '';

    }

    // handles the adding the 
    handleAddSubmit = e =>{
        e.preventDefault();
        // get the value
        const { image, company, review } = e.target;
        // get the state data
        let data = this.state.data;
        let img = this.state.images;

        // put target data into proper objects
        let dataObject = {
            company: company.value,
            review: review.value
        }

        // push the objects in to the correct array
        data.push(dataObject);
        img.push(image.value);

        // insert into the state and then 
        this.setState({
            images: img,
            data: data,
            addWork: false
        })

    }

    // delete a portfolio project
    removeEntry = ()=>{
        let {images, data, currentIndex} = this.state;
        // remove image
        let dataArr = [];
        let imgArr = [];
        // filter the arrays to 
        for(let i =0; i< data.length; i++){
            if(i !== currentIndex){
                dataArr.push(data[i]);
                imgArr.push(images[i]);
            }
            
        }
        console.log(dataArr, 'data after filet');
        console.log(imgArr, 'images');
        this.setState({
            images: imgArr,
            data: dataArr
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


    render(){
        const {images, data, currentIndex} = this.state;
        return(
            <div className="work">
                {this.renderSlider()}
                {this.renderCompanies()}
                {this.renderData()}
                {/* for editing this component */}
                {this.state.editWork
                ? <EditForm
                    data={data}
                    images={images}
                    currentIndex={currentIndex}
                    handleFormSubmit={this.handleEditSubmit}
                    />
                : null}

                {/* for adding to this component */}
                {this.state.addWork
                ? <AddWork
                    handleFormSubmit={this.handleAddSubmit}
                    />
                : null}
            </div>
        );
    }
}
export default Work;