import React from 'react';
import { Link } from 'react-router-dom';

import './Homepage.css';

// render homepage as well as get information
// about the latest collaborations
// int the future
class Homepage extends React.Component{

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
        console.log('rendering statement');
        return(
            <div className="statement">
                <h1>Designing for the creative in all of us</h1>
                <p>
                    We help ambitious organizations tell their story,
                    illustrate their vision, and clarify their identity, 
                    by delivering solutions that entice movements and 
                    achieve results.
                </p>
            </div>
        );
    }

    // get data from api
    renderReview(){
        return(
            <div className="review">
                <h3 className="first-h">"So stoked that our brand will make more</h3>
                <h3>money with this new identity! It also looks dope!"</h3>
                <h3>-Whole Foods</h3>
            </div>
        )
    }

    // static
    renderIntrigue(){
        return(
            <div className="intrig">
                <div className="intrig-content">
                    <h3>
                        Building intriguing brands  to make
                        known intriguing missions.
                    </h3>
                    <p>
                        We want to convey to our clients that we are a
                        versatile artistic consultancy that delight
                        in elevating their brand by assisting them in
                        desiging it with emmaculance. We want them to walk
                        away super stoked to be operating an intriguing brand.
                        it's truly an honor to work with good companies with
                        good intentions. Additionally we seek to assist 
                        companies in expressing their ultimate objectives
                        effectively.
                    </p>
                </div>
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
                {this.renderCollabIntro()}
                {this.renderStatement()}
                {this.renderReview()}
                {this.renderIntrigue()}
                {this.renderTalk()}
            </div>
        );
    }
}

export default Homepage;