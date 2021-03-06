import React from 'react';
import './Contact.css';

// this class handle contact and news letters
// when the form is filled correctly 
// the screen prints loading until the server responds 
// then a message is displayed thanking the user
// and a redirect will happen after 4 seconds
class Contact extends React.Component{

  // handle submit
  handleSubmit = (e)=> {
    e.preventDefault();
    const {
      organization,
      full_name,
      phone,
      subject,
      message
    } = e.target();
    
  }

    render(){
        return (
          <div className="contact-us">
            <h1>Collaborate With Us</h1>

            <form className="contact-form">
              <input
                className="regular-input"
                type="text"
                name="organization"
                placeholder="Company/Organization"
                required
              />
              <div className="split-input-container">
                <div className="split-input">
                  <input
                    className="split"
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    className="split"
                    type="phone"
                    name="phone"
                    placeholder="Phone #"
                    required
                  />
                </div>
                <div className="split-input">
                  <input
                    className="split"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    className="split"
                    type="text"
                    name="location"
                    placeholder="Location"
                    required
                  />
                </div>
              </div>
              <input
                className="regular-input"
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <textarea
                className="regular-input"
                name="message"
                placeholder="Tell us about your project, scope and budget"
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
    }
}

export default Contact;