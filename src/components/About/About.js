import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faPersonBooth } from "@fortawesome/free-solid-svg-icons";

import './About.css';

// this class is made of 2 parts
// the first part is going to be about the company and their process
// the second part is going to be about the founders
// which will be split into 2 sections 1 for each founder
class About extends React.Component{

    renderCompanyAbout(){
        return(
            <div className="company-about">
                <div className="company-logo">
                    <FontAwesomeIcon className="icon" icon={faCloud}/>
                    <p>Mysterion</p>
                </div>
                <div className="about-info">
                    <h1>Who we are</h1>
                    <p>
                        We are new <b>start up</b> with a mission to make 
                        other start ups beautiful brands.
                        But don't think for a second we don't have experience in
                        what we do. Checkout our work <Link to="/work">here</Link>.
                    </p>
                </div>
            </div>
        );
    }

    // render the info on founders
    renderPersonalInfo(){
        return (
          <div className="personal-info">
            <div className="person">
              {/* renders persons pic and name */}
              <div className="person-pic">
                <FontAwesomeIcon icon={faPersonBooth} />
                <h4>Blake</h4>
              </div>
              <p>
                A designer of all things business with several years of
                experience.
              </p>
            </div>
            <div className="person">
              {/* renders persons pic and name */}
              <div className="person-pic">
                <FontAwesomeIcon icon={faPersonBooth} />
                <h4>Caleb</h4>
              </div>
              <p>
                A designer of all things business with several years of
                experience.
              </p>
            </div>
          </div>
        );
    }
    render(){
        return(
            <div className="about">
                {this.renderCompanyAbout()}
                {this.renderPersonalInfo()}
            </div>
        );
    }
}

export default About;