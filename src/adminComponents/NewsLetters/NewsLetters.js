import React from 'react';
import './NewsLetters.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// this class renders a form for creating an email.
// this is the new letter email.
// the admin will be able to view all the sent emails on their own email
// the admin will be able to create nice emails using this.
// I will add additional functionality to this component after it has been tested.
// other future features will include:
// image adding, font changing, text size
class NewsLetter extends React.Component{

    render(){
       return(
           <div className="newsletter">
               <h3>Create and Send News Letters</h3>
              <div className="newsletter-container">
                   <form className="newsletter-form">
                        <button type="submit">
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                      
                       <input name="subject" type="text" 
                       placeholder="Subject" required />

                       <label htmlFor="message">Message:</label>
                       <textarea
                           id="message"
                           name="message"
                           placeholder="Message"
                       >
                       </textarea>
                   </form>
              </div>
           </div>
       );
    }
}

export default NewsLetter;