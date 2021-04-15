import React from 'react';
import Slide from '../Slider/Slide';
import {RenderWorkData} from '../Work/Work';
import { getProjects } from "../Services/service";
import './Homepage.css';

// render homepage as well as get information
// about the latest collaborations
// We will also post the testimony and package name of the 
// company on the main page
class Homepage extends React.Component{

    state = {
        data: null,
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
    getImg = async() =>{

        const projects = await getProjects("highlights");
 
        this.setState({
            // set the data to the filtered[0] to remove the obj from the array
            data: projects
        })
        
    }

    // displays previous slide
    goToPrevSlide = () => {
        if (this.state.currentIndex === this.state.data.images.length - 1) {
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
        if (this.state.currentIndex === this.state.data.images.length - 1) {
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
        if(this.state.data){
            return (
                <div className="homepage-slide">

                    <Slide
                        goToPrevSlide={this.goToPrevSlide}
                        goToNextSlide={this.goToNextSlide}
                        key={this.state.currentIndex}
                        image={this.state.data.images[this.state.currentIndex]}
                    />

                </div>
            );
        }else{
            return null;
        }
    }

    // get data from api
    renderStatement(){
        const testimony = this.state.data ? this.state.data.testimony : 'testimony';
        const person = this.state.data ? this.state.data.person : 'person';
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
        return(
            <div className="homepage">
                {this.renderSlide()}
                <h1>{this.state.data ? this.state.data.company : 'company'}</h1>
                {/* compIndex, data, home=null */}
                {this.state.data ? 
                    RenderWorkData(this.state.currentIndex, this.state.data, true)
                    : null}
               
               {this.renderStatement()}
                {this.renderCompanyStatement()}
            </div>
        );
    }
}

export default Homepage;