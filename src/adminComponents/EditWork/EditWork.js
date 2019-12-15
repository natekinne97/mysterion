import React from 'react';
import './EditWork.css';

// this class allows the admin to edit 
// the portfolio or work section of the site
// this class can be minified by making it a function
class EditForm extends React.Component{

    static defaultProps = {
        images: [],
        data: [],
        currentIndex: 0,
        handleFormSubmit: ()=>{}
    }


    render(){
        const {images, data, currentIndex} = this.props;
        return(
            <div className="work-edit-container" >
               <form className="work-edit-form" onSubmit={this.props.handleFormSubmit}>

                    <label htmlFor="image">Image:</label>
                    <input name="image" type="text" placeholder={images[currentIndex]} required />

                    <label htmlFor="company">Company:</label>
                    <input name="company" type="text" placeholder={data[currentIndex].company} />

                    <label htmlFor="review">Review:</label>
                    <input name="review" type="text" placeholder={data[currentIndex].review} required />
                    
                    <button type="submit">Submit</button>
               </form>
            </div>
        );
    }
}

export default EditForm;