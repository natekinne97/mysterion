import React from 'react';
import roundSTORE from '../../STORE';
import Slide from './Slide'
import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'

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
class Work extends React.Component{
    // this will be removed when we get the backend put together
    static defaultProps = {
        edit: false
    }
    constructor(props){
        super(props);
        this.state = {
            images: [],
            data: [],
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

        let review = roundSTORE.map(data => {
            return data.review;
        })
        let data = [];
        for(let i =0; i < company.length; i++){
            data[i] = {
                company: company[i],
                review: review[i]
            }
        }
       
        this.setState({
            images: img,
            data: data
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
   
    // displays slides
    slider(){
        return (
            <div className="slider">

                <LeftArrow
                    goToPrevSlide={this.goToPrevSlide}
                />

                <div className="slider-wrapper"
                    style={{
                        transform: `translateX(${this.state.translateValue}px)`,
                        transition: 'transform ease-out 0.45s'
                    }}>
                   
                    <Slide 
                        key={this.state.currentIndex}
                        data={this.state.data[this.state.currentIndex]} 
                        image={this.state.images[this.state.currentIndex]}
                     />
                </div>

                <RightArrow
                    goToNextSlide={this.goToNextSlide}
                />
            </div>
        );
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

    // render the company and review from the company. 
    // this renders underneath the slide
    renderData(){

        let data = this.state.data;
        let index = this.state.currentIndex;
        // because of the double render make sure to 
        // include this or it will break.
        // we have to make sure the mapping of the data happened first
        if(data[this.state.currentIndex] !== undefined){
            return(
                <div className="work-data">
                    <p>Company: {data[index].company}</p>
                    <p>Review: {data[index].review}</p>
                    {this.renderOptions()}
                </div>
            );
        }else{
            return(
                <div className="work-data">
                    <p className="red">Something went wrong.</p>
                </div>
            );
        }
    }


    render(){
        const {images, data, currentIndex} = this.state;
        return(
            <div className="work">
                {this.slider()}
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