import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import SubscriberForm from '../SubscriberForm/SubscriberForm';
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
             <div className="rights-container">
                <h4>Mysterion</h4>
                <p className="rights-reserved">&copy; Mysterion LLC 2019 All Rights Reserved</p>
             </div>
            </div>

            <div className="link-container">
              <div className="link-column">
                

                <div className="list-row">
                  <ul className="link-list">
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="/work">Work</Link>
                    </li>
                    
                  </ul>

                  <ul className="link-list">
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/shop">Shop</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="rights">
              <SubscriberForm styles="footerForm" />
              {/* <form className="news-letter-form">
                <input
                  type="email"
                  placeholder="Subscribe to our news letter"
                  required
                />
                <button type="submit" className="red-btn">
                  Sign Up
                  </button>
              </form> */}
              <a href="mailto:mysterion@gmail.com">Mysterion@gmail.com</a>
              
            </div>
          </div>
        );
    }
}

export default Footer;