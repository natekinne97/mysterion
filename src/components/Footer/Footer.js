import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

import './Footer.css';
// handle subscriptions to news letter
class Footer extends React.Component{

    render(){
        return (
          <div className="footer">
            {/* business and media section */}
            <div className="business">
              <div className="media">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagram} />
              </div>
              <FontAwesomeIcon className="cloud-icon" icon={faCloud} />
              <h4>Mysterion</h4>
            </div>

           

            {/* important links */}
            <div className="links">
              <div className="list-links">
                <form className="new-letter-form">
                  <input
                    type="email"
                    name="email"
                    placeholder="Subscribe to our news letter."
                  />
                  <button type="submit">Sign Up</button>
                </form>
                <ul>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/work">Work</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
              <Link to="/shop">Shop</Link>
            </div>
           

            {/* news letter and email */}
            <div className="new-letter">
             
              <a href="meilto:mysterion@gmail.com">mysterion@gmail.com</a>
            </div>
          </div>
        );
    }
}

export default Footer;