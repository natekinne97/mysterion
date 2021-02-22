import React from 'react';
import AddSubscriber from './SubscriberHelper';
import './SubscriberForm.css';

// this is a component that can be reused multiple times
export default function SubscriberForm(props){
    const {styles} = props;
    
    return (
      <form className={styles} onSubmit={AddSubscriber}>
        <input
          type="email"
          placeholder="Subscribe to our news letter"
          name="email"
          required
        />
        <button type="submit" className="red-btn">
          Sign Up
        </button>
      </form>
    );
}