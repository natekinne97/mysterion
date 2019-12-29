import React from 'react';

// this class is for adding work to the work page
// it adds a new file.
class AddWork extends React.Component{

    static defaultProps = {
        handleFormSubmit: ()=>{}
    }

    render(){
        return (
          <div className="work-edit-container">
            <form
              className="work-edit-form"
              onSubmit={this.props.handleFormSubmit}
            >
              <label htmlFor="image">Image:</label>
              <input
                name="image"
                type="text"
                
                required
              />

              <label htmlFor="company">Company:</label>
              <input
                name="company"
                type="text"
                
                required
              />

              <label htmlFor="testimony">Testimony:</label>
              <input
                name="testimony"
                type="text"
                
                required
              />

              <label htmlFor="person">Person Quoted</label>
              <input
                name="person"
                type="text"
                
                required
              />

              <label htmlFor="scope">Scope or Package</label>
              <input
                name="scope"
                type="text"
                
                required
              />

              <label htmlFor="bottomline">
                How it effected the bottom line:
              </label>
              <input
                name="bottomline"
                type="text"
                
                required
              />

              {/* change to file upload */}
              <label htmlFor="logo">Logo</label>
              <input
                name="logo"
                type="text"
               
                required
              />

              <label htmlFor="link">Link to website</label>
              <input
                name="link"
                type="text"
                
                required
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        );
    }

}

export default AddWork;