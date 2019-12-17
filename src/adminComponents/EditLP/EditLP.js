import React from 'react';
import LandingPage from '../../components/LandingPage/LandingPage';

// this is for editing the landing page. 
// the styling and the content.

class EditLP extends React.Component{
// all of the input will be pre populated by the server.
// most everything will be editable
    state = {
        style: {},
        header: '',
        par: ''
    }

    formSubmit = e =>{
        e.preventDefault();
        const {header, par, img, color} = e.target;

        let styleData = {
            color: color.value,
            image: img.value
        }

        let content = {
            header: header.value,
            par: par.value
        }
       
        let styleKeys = Object.keys(styleData);
        let contentKeys = Object.keys(content);
        let alterBgImg = {
            backgroundImage: `url(${img.value})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 60%'
        }

        // take a part the style and change it depending on if an image is used.
        // this will be changed to be the server response.
        for(let i = 0; i < styleKeys.length; i++){
            if (styleData[styleKeys[i]] && styleKeys[i] === 'image'){
                console.log('image found');
                styleData = {...alterBgImg, color: styleData.color ? styleData.color : 'red' }
                console.log(styleData);
            }
        }
        // check if all are empty
        for(let i = 0; i < styleKeys.length; i++){
            if(!styleData[styleKeys[i]]){
                delete styleData[styleKeys[i]];
            }
        }

        for (let i = 0; i < contentKeys.length; i++) {
            if (!content[contentKeys[i]]) {
                delete content[contentKeys[i]];
            }
        }
        console.log(content.length, ' content', styleData.length, 'style')
        if(content.length === undefined && styleData.length === undefined){
            console.log('submit something');
        }

        // determine what is being used for content
        if(content.header && content.par){
            this.setState({
                header: content.header,
                par: content.par,
                style: styleData
            });
        }else if(content.header){
            this.setState({
                header: content.header,
                style: styleData
            });

        }else if(content.par){
            this.setState({
                par: content.par,
                style: styleData
            });
        }else{
            this.setState({
                style: styleData
            })
        }

        
       
    }

    render(){
        return(
            <div className="editlp">
                <h1>Edit LandingPage</h1>
                <form className="editlp-form gen-form" onSubmit={this.formSubmit}>
                    <label htmlFor="header">Add a Header</label>
                    <input name="header" type="text"/>
                        
                    <label htmlFor="par">Add a paragraph</label>
                    <textarea name="par"></textarea>

                    <label htmlFor="img">Change background Image</label>
                    <input name="img" type="text"/>

                    <label htmlFor="color">Text Color: rgb, hex, solid colors</label>
                    <input name="color" type="text"/>

                    <button type="submit">Change</button>

                </form>
                <LandingPage header={this.state.header} par={this.state.par} styles={this.state.style} />
            </div>
        );
    }
}

export default EditLP;