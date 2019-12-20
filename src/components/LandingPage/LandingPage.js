import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';

// this component will be used to get more subscribers
// to the news letter. 
// there will be several other functions in this file. 
// one dealing with getting the data for styling 
// and one for handling form submits.

const LandingPage = (props) =>{
   

    return(
        <div className={`landingpage ${props.edit ? 'lp-edit' : ''}`} style={props.styles}>
            {/* allows adming to add a header */}
            {props.header ?
            <h1>{props.header}</h1>
            : null}

            {props.par ?
            <p>{props.par}</p>
            : null}

            <form className={`letter-form`}>
                <label htmlFor="email">Sign up for our news letter.</label>
               <div className="form-things">
                    <input name="email"
                    placeholder="Sign up"
                    type="email" required />
                    <button type="submit">Subscribe</button>
               </div>
            </form>
            <Link to="/" style={props.linkStyle}>Homepage</Link>
        </div>
    );
}

export default LandingPage;