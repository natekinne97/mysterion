import React from 'react';
import './Contact.css';

// this class handle contact and news letters
// when the form is filled correctly 
// the screen prints loading until the server responds 
// then a message is displayed thanking the user
// and a redirect will happen after 4 seconds
class Contact extends React.Component{

    render(){
        return(
            <div className="contact-us">
                <h1>Collaborate With Us</h1>
                
                <form className="contact-form">
                    <input type="text" name="organization" placeholder='Company/Organization'/>
                    <div className='split-input-container'>
                        <div className="split-input">
                            <input type="text" name="full_name" placeholder='Full Name'/>
                            <input type="phone" name='phone' placeholder='Phone #'/>
                        </div>
                        <div className='split-input'>
                            <input type="email" name='email' placeholder='Email'/>
                            <input type='text' name='location' placeholder='Location'/>
                        </div>
                    </div>
                    <input type='text' name='subject' placeholder='Subject'/>
                    <textarea name='message' placeholder='Tell us about your project, scope and budget'>

                    </textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Contact;