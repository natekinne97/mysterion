import React from 'react'
import {idGenerator} from './service'
import {get, isEmpty} from 'lodash'



const Multipolar = ({fonts})=>{
    if(!fonts)return null
    console.log(fonts, 'multipolar')
    const fontStyles = get(fonts, 'styles')
    const title = get(fonts, 'title')
    // fonts
    return (
        <div className="fonts">
           <div className="font-container">
               {/*  */}
            <div className="font-names-title">
                {/* font-names */}
                 <div className="">
                     {/* font-class-name */}
                <p className="red">{fonts?.title}</p>
                <div className="variants">
                    {!isEmpty(fontStyles) && fontStyles.map(font=>(
                        <p key={idGenerator(99)}>{font}</p>
                    ))}
                </div>
             </div>
             <h3 className="char">&?</h3>
            </div>
                <div className="selector">
                     <select className="type-selector">
                        {!isEmpty(fontStyles) && fontStyles.map(font=>(
                         <option key={idGenerator(79)} value={font}>{font}</option>
                        ))}
                     </select>
                     <p>Type with specimen</p>
                </div>
                <p contentEditable="true">
                    "They promised us flying cars but all we got was 150 characters" - Peter Thiel
                </p>
           </div>
        </div>
    )
}

export default Multipolar