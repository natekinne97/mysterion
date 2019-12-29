import React from 'react';
import './EditWork.css';

// this class allows the admin to edit 
// the portfolio or work section of the site
// this class can be minified by making it a function
class EditForm extends React.Component{

    static defaultProps = {
        images: [],
        company: [],
        testimony: [],
        person: [],
        scope: [],
        bottomLine: [],
        logo: [],
        link: [],
        currentIndex: 0,
        handleFormSubmit: ()=>{}
    }


    render(){
        let {
          images,
          company,
          testimony,
          person,
          scope,
          bottomLine,
          logo,
          link,
          currentIndex
        } = this.props;

        const editThing = {

        }
        return(
            <div className="work-edit-container" >
               <form className="work-edit-form" onSubmit={this.props.handleFormSubmit}>

                    <label htmlFor="image">Image:</label>
                    <input name="image" type="text" placeholder={images[currentIndex]} required />

                    <label htmlFor="company">Company:</label>
                    <input name="company" type="text" placeholder={company[currentIndex]} required/>

                    <label htmlFor="testimony">Testimony:</label>
                    <input name="testimony" type="text" placeholder={testimony[currentIndex]}  required />
                    
                    <label htmlFor="person">Person Quoted</label>
                    <input name="person" type="text" placeholder={person[currentIndex]} required/>

                    <label htmlFor="scope">Scope or Package</label>
                    <input name='scope' type='text' placeholder={scope[currentIndex]} required/>

                    <label htmlFor="bottomline">How it effected the bottom line:</label>
                    <input name='bottomline' type="text" placeholder={bottomLine[currentIndex]} required/>

                    {/* change to file upload */}
                    <label htmlFor='logo'>Logo</label>
                    <input name='logo' type='text' placeholder={logo[currentIndex]} required/>

                    <label htmlFor="link">Link to website</label>
                    <input name='link' type='text' placeholder={link[currentIndex]} required/>

                    <button type="submit">Submit</button>
               </form>
            </div>
        );
    }
}

export default EditForm;