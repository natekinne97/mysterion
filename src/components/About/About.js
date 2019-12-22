import React from "react";
import './About.css';

// this class is made of 2 parts
// the first part is going to be about the company and their process
// the second part is going to be about the founders
// which will be split into 2 sections 1 for each founder
class About extends React.Component{

  renderWhoWeAre(){
    return(
      <div className="who-we-are">  
        <header>
          <h1>GREETINGS</h1>
          <h1>We are Mysterion!</h1>
        </header>
        <p>
          We help ambitious organizations tell their story,
          illustrate their vision, and clarify their identity, by
          delivering solutions that entice movement and achieve results.
        </p>
        <p>
          We want to convey to our clients that we area a versatile,
          artistic consultancy that delight in elevating their brand
          by assisting them in designing it with emmaculence.
          We want them to walk away super stoked to be operating an intriguing
          brand! It is truly an honor to work with great companies with good 
          intentions. Additionally, we seek to assist companies in expressing
          their ultimate objectives effectively.
        </p>

        <p>
          We want to "extract the creative inside everyone". With us branding the
          branding experience is more than just giving us the reigns of the creative 
          process for an inventing the identity system, it's putting the 
          entrepeneur front and center in visualising their vivid vision.
          We make them the hero of the creative side of their business by lifting up
          ideas and encouraging them that however much of a left brain thinker
          they are, they are not ceasing to be a creative individual.
        </p>

      </div>
    );
  }
  
  renderTeamMembers(){
    return (
      <div className="team-members">
        <header>
          <h1>Team Members</h1>
        </header>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
           velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
           occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
           mollit anim id est laborum
        </p>
      </div>
    );
  }

  renderMembers(){
    return(
      <div className="members">
        <div className="member">
          <div className="blake"></div>
          <h4>Blake Watson</h4>
          <p>
            Lead Marketer, Strategist
            and Spokesman at Mysterion
          </p>
          
        </div>
        <div className="member">
          <div className="caleb"></div>
          <h4>Caleb East</h4>
          <p>
            Creative Director/Designer
            for Mysterion
          </p>

        </div>
      </div>
    );
  }
    
    render(){
        return(
            <div className="about">
                {this.renderWhoWeAre()}
                {this.renderTeamMembers()}
                {this.renderMembers()}
            </div>
        );
    }
}

export default About;