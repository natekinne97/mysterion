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
                <h1>Ask us a question</h1>
                <p>Want us to consult for you or do you have any questions?</p>
                <form className="contact-form">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="name"/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Personal email"/>
                    <label htmlFor="subject">Subject</label>
                    <input type="text" name="subject" placeholder="Reason for contact"/>
                    <label htmlFor="message">Message</label>
                    <textarea name="message"></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default Contact;