import React from 'react';

// this class is for adding work to the work page
// it adds a new file.
class AddWork extends React.Component{

    static defaultProps = {
        handleFormSubmit: ()=>{}
    }

    render(){
        return(
            <div className="work-edit-container" >
                <form className="work-edit-form" onSubmit={this.props.handleFormSubmit}>

                    <label htmlFor="image">Image:</label>
                    <input name="image" type="text" required />

                    <label htmlFor="company">Company:</label>
                    <input name="company" type="text"  required/>

                    <label htmlFor="review">Review:</label>
                    <input name="review" type="text" required />

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default AddWork;