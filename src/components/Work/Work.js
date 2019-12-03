import React from 'react';
import roundSTORE from '../../STORE';
import Slide from './Slide'
import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'

import './Work.css';
// this class renders work
// the main project will be rendere in a carousel
// click on it and it expands with more info
// displays review and company name over work
class Work extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            images: [],
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
        let img = roundSTORE.map(image =>{
            return image.img
        })
        console.log(img);
        this.setState({
            images: img
        })
    }


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
   
  
    slider(){
        console.log(this.state.images, 'state');
        return (
            <div className="slider">

                <div className="slider-wrapper"
                    style={{
                        transform: `translateX(${this.state.translateValue}px)`,
                        transition: 'transform ease-out 0.45s'
                    }}>
                    <Slide key={this.state.currentIndex} image={this.state.images[this.state.currentIndex]}/>
                </div>

                <LeftArrow
                    goToPrevSlide={this.goToPrevSlide}
                />

                <RightArrow
                    goToNextSlide={this.goToNextSlide}
                />
            </div>
        );
    }

    render(){
        return(
            <div className="work">
                {this.slider()}
            </div>
        );
    }
}
export default Work;