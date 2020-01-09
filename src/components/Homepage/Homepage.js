import React from 'react';
import { Link } from 'react-router-dom';
import Slide from '../Slider/Slide';
import FEATURE from '../../FeaturedStrore';
import {RenderWorkData} from '../Work/Work';
import './Homepage.css';

// render homepage as well as get information
// about the latest collaborations
// We will also post the testimony and package name of the 
// company on the main page
class Homepage extends React.Component{

    state = {
        images: [],
        company: '',
        testimony: '',
        person: '',
        package: '',
        bottomLine: '',
        logo: '',
        link: '',
        remove: 'hidden',
        editWork: false,
        addWork: false,
        currentIndex: 0,
    }

    componentDidMount() {
        this.getImg();
    }

    // this will run in didmount
    // it will make the call to the server to get all the images for the slide
    getImg() {
        let data = FEATURE;
        this.setState({
            images: data.img,
            company: data.company,
            testimony: data.testimony,
            person: data.person,
            package: data.package,
            bottomLine: data.bottomLine,
            logo: data.logo,
            link: data.link
        }) 

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

    renderSlide(){
        return(
            <div className="homepage-slide">
                
                <Slide
                    goToPrevSlide={this.goToPrevSlide}
                    goToNextSlide={this.goToNextSlide}
                    key={this.state.currentIndex}
                    image={this.state.images[this.state.currentIndex]}
                />
               
            </div>
        );
    }

    // there will be a carousel here that displays work done for recent 
    // projects

    // get data from api
    renderStatement(){
        const testimony = this.state.testimony ? this.state.testimony : 'testimony';
        const person = this.state.person ? this.state.person : 'person';
        return(
            <div className="entry">
                <p>"{testimony}"</p>
                <p>{person}</p>
            </div>
        );
    }

    renderCompanyStatement(){
        return(
            <div className="company-motto-container">
                <div className="company-motto">
                    <h3>Take Action! Get Results!</h3>
                    <p>
                        We help ambitious organizations tell their story,
                        illustrate their vision, and clarify their identity,
                        by delivering solutions that entice movement and achieve results.
                    </p>
                </div>
            </div>
        );
    }


    render(){
    //    index, scope, bottomLine, visit, logo, company
        return(
            <div className="homepage">
                {this.renderSlide()}
                <h1>{this.state.company}</h1>
                {RenderWorkData(this.state.currentIndex,
                    this.state.package, this.state.bottomLine,
                    this.state.link, this.state.logo, this.state.company, 'homepage')}
               
               {this.renderStatement()}
                {this.renderCompanyStatement()}
            </div>
        );
    }
}

export default Homepage;