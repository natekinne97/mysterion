import React from 'react';
import { Link } from 'react-router-dom';
import Slide from '../Slider/Slide';
import FEATURE from '../../FeaturedStrore';

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

    // gets data from api
    renderCollabIntro(){
        return(
            <div className="collabs">
                <h2 className="bottom-text">Take a look at our latest</h2>
                <h2>collaboration with Vitamin Water</h2>
            </div>
        );
    } 

    // there will be a carousel here that displays work done for recent 
    // projects

    // get data from api
    renderStatement(){
        const company = this.state.company ? this.state.company : 'company';
        const testimony = this.state.testimony ? this.state.testimony : 'testimony';
        const person = this.state.person ? this.state.person : 'person';
        return(
            <div className="entry">
                <h1>{company}</h1>
                <p>{testimony}</p>
                <p>{person}</p>
            </div>
        );
    }

    renderScope(){
        const pack = this.state.package ? this.state.package : 'branding';

        return (
            <div className="pack entry">
                <h1>Scope</h1>
                <div className="orange-bar"></div>
                <p>{pack}</p>
            </div>
        );
    }

    renderBottomLine(){
        const bottom = this.state.bottomLine ? this.state.bottomLine : 'Our company has gotten so much more revenue.';
        
        return(
            <div className="entry">
                <h1>Bottom Line</h1>
                <div className="orange-bar" title="orange bar"></div>
                <p>{bottom}</p>
            </div>
        );
    }

    renderCheckEmOut(){
        const logo = this.state.logo
          ? this.state.logo
          : "https://i.imgur.com/uc813km.jpg";
        const link = this.state.link ? this.state.link : 'google.com';
        const imgStyle = {
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 60%",
        };
        return(
            <div className='entry'>
                <h1>Go Check Em Out</h1>
                <div className="orange-bar"></div>
                <p>Click the logo to visit their site</p>
                <a href={link}>
                    <div className="logo-link" style={imgStyle}></div>
                </a>
            </div>
        );
    }

   

    renderTalk(){
        return(
            <div className="talk">
                <h1>Let's talk!</h1>
                <Link className="btn-red" to="/contact">Drop us a message</Link>
            </div>
        );
    }

    render(){
        return(
            <div className="homepage">
                {this.renderSlide()}
                {this.renderStatement()}
                {this.renderScope()}
                {this.renderBottomLine()}
                {this.renderCheckEmOut()}
            </div>
        );
    }
}

export default Homepage;